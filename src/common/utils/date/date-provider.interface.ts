export abstract class IDateProvider {
  abstract now: () => string;
  abstract diffInSecs: (date: Date, dateToCompare: Date) => number;
}
