import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { IDateProvider } from './date-provider.interface';

@Injectable()
export class DayjsDateProvider implements IDateProvider {
  now(): string {
    return dayjs().toString();
  }

  diffInSecs(date: Date, dateToCompare: Date): number {
    return dayjs(date).diff(dateToCompare, 'second');
  }
}
