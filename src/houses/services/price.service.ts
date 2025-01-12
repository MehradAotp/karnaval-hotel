import { Injectable } from '@nestjs/common';
import * as moment from 'moment-jalali';
import { HouseService } from '../houses.service';

@Injectable()
export class PriceService {
  constructor(private houseService: HouseService) {}
  private isWeekday(day: number): boolean {
    return day >= 0 && day <= 4;
  }

  private isWeekend(dayOfWeek: number): boolean {
    return dayOfWeek === 5 || dayOfWeek === 6;
  }

  private isPeakSeason(day: number): boolean {
    return day === 30 || day === 31;
  }

  private getDayFromDate(date: string): {
    dayOfMonth: number;
    dayOfWeek: number;
    gregorianDate: string;
    dayType: string;
  } {
    const [year, month, day] = date.split('/').map(Number);
    const jalaliDate = moment(`${year}/${month}/${day}`, 'jYYYY/jMM/jDD');

    const gregorianDate = jalaliDate.toDate();
    const gregorianMoment = moment(gregorianDate);
    const gregorianFormatted = gregorianMoment.format('YYYY/MM/DD');

    const dayOfMonth = gregorianMoment.date();
    const dayOfWeek = gregorianMoment.day();
    let dayType = 'Weekday';
    if (this.isWeekend(jalaliDate.day())) {
      dayType = 'Weekend';
    } else if (this.isPeakSeason(jalaliDate.jDate())) {
      dayType = 'Peak';
    }

    return {
      dayOfMonth,
      dayOfWeek,
      gregorianDate: gregorianFormatted,
      dayType,
    };
  }

  calculatePrice(
    dayOfMonth: number,
    dayOfWeek: number,
    weekPrice: number,
    weekendPrice: number,
    peakPrice: number,
  ): number {
    if (this.isPeakSeason(dayOfMonth)) {
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

  async getCalendarPrices(dates: string[], houseId: string): Promise<any> {
    const house = await this.houseService.findHouseById(houseId);
    if (!house) {
      throw new Error('House not found');
    }
    const [startDate, endDate] = dates;
    const result = [];

    const allDates = this.getDatesBetween(startDate, endDate);

    for (const date of allDates) {
      const { dayOfMonth, dayOfWeek, gregorianDate, dayType } =
        this.getDayFromDate(date);

      const price = this.calculatePrice(
        dayOfMonth,
        dayOfWeek,
        house.midWeekPrice,
        house.weekendPrice,
        house.peakSeasonPrice,
      );
      result.push({
        date: gregorianDate,
        dayOfMonth,
        dayOfWeek,
        price,
        type: dayType,
      });
    }

    return result;
  }

  private getDatesBetween(startDate: string, endDate: string): string[] {
    const start = moment(startDate, 'jYYYY/jMM/jDD');
    const end = moment(endDate, 'jYYYY/jMM/jDD');
    const dates = [];

    while (start.isSameOrBefore(end)) {
      dates.push(start.format('jYYYY/jMM/jDD'));
      start.add(1, 'days');
    }

    return dates;
  }
}
