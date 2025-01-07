import type { Todo } from '@/shared/types';
import { formatTimestamp } from './format-timestamp';

export function checkBetweenDate(dateString: string) {
  return ({ startDay, endDay }: Todo): boolean => {
    return (
      formatTimestamp(startDay) === dateString ||
      formatTimestamp(endDay) === dateString
    );
  };
}
