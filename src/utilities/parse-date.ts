import { checkDate } from './check-date';

export function parseDate(date: string): number {
  const [day, month, year] = date
    .split('.')
    .map((x: string): number => Number(x));

  if (!checkDate(day, month, year)) {
    return Number.NaN;
  }

  return new Date(year, month - 1, day, 23, 59, 59).getTime();
}
