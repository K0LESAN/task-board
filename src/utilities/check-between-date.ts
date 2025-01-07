import type { Todo } from '@/shared/types';
import { formatTimestamp } from './format-timestamp';

export function checkBetweenDate(milliseconds: number, dateString: string) {
  return ({ startDay, endDay }: Todo): boolean => {
    return (
      (milliseconds >= startDay && milliseconds <= endDay) ||
      formatTimestamp(startDay) === dateString ||
      formatTimestamp(endDay) === dateString
    );
  };
}
