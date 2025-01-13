import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as moment from 'moment-jalali';
import { HouseService } from '../houses.service';
import {
  CalendarPriceResponseDto,
  DayFromDateResponseDto,
} from '../dto/price.dto';

@Injectable()
export class PriceService {
  constructor(private houseService: HouseService) {}

  private isWeekday(day: number): boolean {
    return day >= 0 && day <= 4;
  }

  private isWeekend(dayOfWeek: number): boolean {
    return dayOfWeek === 5 || dayOfWeek === 6;
  }

  private isPeakSeason(getDay: number, month: number): boolean {
    const peakDays = [
      { month: 10, day: 15 },
      { month: 10, day: 30 },
      { month: 10, day: 18 },
    ];
    return peakDays.some((peak) => peak.month === month && peak.day === getDay);
  }

  private getDayFromDate(date: string): DayFromDateResponseDto {
    try {
      if (!date || typeof date !== 'string') {
        throw new BadRequestException('Invalid date format.');
      }

      const [year, month, day] = date.split('/').map(Number);
      if (!year || !month || !day) {
        throw new BadRequestException('Invalid date components.');
      }

      const jalaliDate = moment(`${year}/${month}/${day}`, 'jYYYY/jMM/jDD');
      if (!jalaliDate.isValid()) {
        throw new BadRequestException(`Invalid Jalali date: ${date}`);
      }

      const gregorianDate = jalaliDate.toDate();
      const gregorianMoment = moment(gregorianDate);
      const gregorianFormatted = gregorianMoment.format('YYYY/MM/DD');
      const getmonth = jalaliDate.jMonth() + 1;
      const getDay = jalaliDate.jDate();
      const dayOfWeek = gregorianMoment.day();
      let dayType = 'Weekday';
      if (this.isPeakSeason(getDay, getmonth)) {
        dayType = 'Peak';
      } else if (this.isWeekend(dayOfWeek)) {
        dayType = 'Weekend';
      }

      return {
        getDay,
        dayOfWeek,
        gregorianDate: gregorianFormatted,
        dayType,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        console.error(`Error in getDayFromDate: ${error.message}`, error);
        throw new InternalServerErrorException(
          'An error occurred while processing the date.',
        );
      }
    }
  }

  calculatePrice(
    getDay: number,
    dayOfWeek: number,
    weekPrice: number,
    weekendPrice: number,
    peakPrice: number,
  ): number {
    const currentMonth = moment().jMonth() + 1;
    if (this.isPeakSeason(getDay, currentMonth)) {
      return peakPrice;
    }
    if (this.isWeekday(dayOfWeek)) {
      return weekPrice;
    }
    if (this.isWeekend(dayOfWeek)) {
      return weekendPrice;
    }
    return weekPrice;
  }

  async getCalendarPrices(
    dates: string[],
    houseId: string,
  ): Promise<CalendarPriceResponseDto[]> {
    try {
      const house = await this.houseService.findHouseById(houseId);
      if (!house) {
        throw new BadRequestException(`House with ID ${houseId} not found.`);
      }
      const peakPrice = house.peakSeasonPrice;

      const [startDate, endDate] = dates;
      if (!startDate || !endDate) {
        throw new BadRequestException(
          'Start and end dates are required and must be valid strings.',
        );
      }

      const result: CalendarPriceResponseDto[] = [];
      const allDates = this.getDatesBetween(startDate, endDate);

      for (const date of allDates) {
        const { getDay, dayOfWeek, gregorianDate, dayType } =
          this.getDayFromDate(date);

        const price = this.calculatePrice(
          getDay,
          dayOfWeek,
          house.midWeekPrice,
          house.weekendPrice,
          peakPrice,
        );
        result.push({
          date: gregorianDate,
          getDay,
          dayOfWeek,
          price,
          type: dayType,
        });
      }

      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        console.error(`Error in getCalendarPrices: ${error.message}`, error);
        throw new InternalServerErrorException(
          'An unexpected error occurred while retrieving calendar prices.',
        );
      }
    }
  }

  private getDatesBetween(startDate: string, endDate: string): string[] {
    try {
      const start = moment(startDate, 'jYYYY/jMM/jDD');
      const end = moment(endDate, 'jYYYY/jMM/jDD');

      if (!start.isValid() || !end.isValid()) {
        throw new BadRequestException(
          `Invalid date range: ${startDate} - ${endDate}`,
        );
      }

      const dates = [];
      while (start.isSameOrBefore(end)) {
        dates.push(start.format('jYYYY/jMM/jDD'));
        start.add(1, 'days');
      }

      return dates;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        console.error(`Error in getDatesBetween: ${error.message}`, error);
        throw new InternalServerErrorException(
          'An error occurred while calculating date range.',
        );
      }
    }
  }
}
