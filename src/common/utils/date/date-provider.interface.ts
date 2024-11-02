export abstract class IDateProvider {
  abstract now: () => string;
  abstract diffInMs: (date: Date, dateToCompare: Date) => number;
}
