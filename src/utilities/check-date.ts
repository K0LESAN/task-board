import { getDaysInMonth } from './get-days-in-month';

export function checkDate(
  day: unknown,
  month: unknown,
  year: unknown
): boolean {
  if (
    typeof day !== 'number' ||
    typeof month !== 'number' ||
    typeof year !== 'number'
  ) {
    return false;
  }

  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1970) {
    return false;
  }

  const countDaysInMonth: number = getDaysInMonth(year, month);

  if (day > countDaysInMonth) {
    return false;
  }

  return true;
}
