import { getDaysInMonth } from '.';

describe('getDaysInMonth utils', () => {
  it('truthy values', () => {
    const testCases: number[] = [
      31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
    ];

    testCases.forEach((result: number, month: number): void => {
      expect(getDaysInMonth(2000, month)).toBe(result);
    });
  });
});
