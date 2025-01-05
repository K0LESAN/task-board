import type { Todo } from '@/types';
import { TodoType } from '@/constants';
import { formatTimestamp } from '@/utilities/format-timestamp';
import * as styles from './index.module.scss';

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo: { type, startDay, endDay, text } }: Props) => {
  const isExpired: boolean =
    type !== TodoType.done && endDay - new Date().getTime() <= 0;

  return (
    <div className={styles.todo} title={text}>
      <label className={styles.field} htmlFor='start-day'>
        <span className={styles.label}>Начало:</span>{' '}
        <input
          className={styles.value}
          type='text'
          id='start-day'
          disabled
          value={formatTimestamp(startDay)}
        />
      </label>
      <label className={styles.field} htmlFor='end-day'>
        <span className={styles.label}>Окончание:</span>
        <input
          className={`${styles.value} ${isExpired ? styles.expired : ''}`}
          type='text'
          id='end-day'
          disabled
          value={formatTimestamp(endDay)}
        />
      </label>
      <label
        className={styles.field}
        htmlFor='text'
        style={{ textOverflow: 'ellipsis' }}
      >
        <span className={styles.label}>Описание:</span>{' '}
        <input
          className={styles.value}
          type='text'
          id='text'
          disabled
          value={text}
        />
      </label>
    </div>
  );
};

export default TodoItem;
