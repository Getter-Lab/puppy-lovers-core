import { IDateProvider } from './date-provider.interface';
import { DayjsDateProvider } from './dayjs-date';

describe('[Unit] Dayjs date provider', () => {
  let dateProvider: IDateProvider;

  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
  });

  describe('now()', () => {
    it('should return string now date', () => {
      jest.useFakeTimers({
        now: new Date('2024-04-29'),
      });

      const output = dateProvider.now();
      expect(output).toBe('2024-04-29T00:00:00.000Z');
    });
  });

  describe('diffInMs()', () => {
    it('should return string date diff', () => {
      const date1 = new Date('2024-04-29');
      const date2 = new Date('2024-04-28');
      const output = dateProvider.diffInMs(date1, date2);
      console.log(output);
      expect(output).toBe(86400000);
    });
  });
});
