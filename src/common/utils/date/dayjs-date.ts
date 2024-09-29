import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { IDateProvider } from './date-provider.interface';

@Injectable()
export class DayjsDateProvider implements IDateProvider {
  now(): string {
    return dayjs().toISOString();
  }

  diffInMs(date: Date, dateToCompare: Date): number {
    return dayjs(date).diff(dateToCompare, 'ms');
  }
}
