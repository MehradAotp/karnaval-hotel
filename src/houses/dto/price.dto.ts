export class CalendarPriceResponseDto {
  date: string;
  getDay: number;
  dayOfWeek: number;
  price: number;
  type: string;
}
export class DayFromDateResponseDto {
  getDay: number;
  dayOfWeek: number;
  gregorianDate: string;
  dayType: string;
}
