import type { Todo } from '@/shared/types';
import { getFormattedDate } from './get-formatted-date';

export function checkBetweenDate(milliseconds: number, dateString: string) {
  return ({ startDay, endDay }: Todo): boolean => {
    return (
      (milliseconds >= startDay && milliseconds <= endDay) ||
      getFormattedDate(startDay) === dateString ||
      getFormattedDate(endDay) === dateString
    );
  };
}
