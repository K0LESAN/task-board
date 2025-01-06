import { type ChangeEvent, useState } from 'react';
import type { Todo } from '@/types';
import { TodoType } from '@/constants';
import { formatTimestamp } from '@/utilities/format-timestamp';
import crossIcon from '@/assets/icons/cross.svg';
import checkIcon from '@/assets/icons/check.svg';
import { useTodo } from '@/hooks/todo';
import { parseDate } from '@/utilities/parse-date';
import Draggable from '../draggable';
import SVG from '../svg';
import EditIcon from '../edit-icon';
import * as styles from './index.module.scss';

interface Props {
  todo: Todo;
}

interface TodoForm extends Pick<Todo, 'text'> {
  startDay: string;
  endDay: string;
}

const TodoItem = ({ todo: { id, type, startDay, endDay, text } }: Props) => {
  const isExpired: boolean =
    type !== TodoType.done && endDay - new Date().getTime() <= 0;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<TodoForm>({
    text,
    startDay: formatTimestamp(startDay),
    endDay: formatTimestamp(endDay),
  });
  const { changeTodo } = useTodo();
  const editableClass: string = isEdit ? styles.value_editable : '';

  return (
    <Draggable
      key={id}
      draggableClass={styles.draggable}
      draggableArguments={{
        id,
        disabled: isEdit,
        data: {
          id,
          type,
          startDay,
          endDay,
          text,
        },
      }}
      classNames={styles.todo}
      title={text}
    >
      <label className={styles.field} htmlFor='start-day'>
        <span className={styles.label}>Начало:</span>{' '}
        <input
          className={`${styles.value} ${editableClass}`}
          type='text'
          id='start-day'
          disabled={!isEdit}
          value={isEdit ? newTodo.startDay : formatTimestamp(startDay)}
          autoComplete='off'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setNewTodo((prev) => ({
              ...prev,
              startDay: event.target.value,
            }));
          }}
        />
      </label>
      <label className={styles.field} htmlFor='end-day'>
        <span className={styles.label}>Окончание:</span>
        <input
          className={`${styles.value} ${editableClass} ${
            !isEdit && isExpired ? styles.expired : ''
          }`}
          type='text'
          id='end-day'
          disabled={!isEdit}
          value={isEdit ? newTodo.endDay : formatTimestamp(endDay)}
          autoComplete='off'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setNewTodo((prev) => ({
              ...prev,
              endDay: event.target.value,
            }));
          }}
        />
      </label>
      <label className={styles.field} htmlFor='text'>
        <span className={styles.label}>Описание:</span>{' '}
        {isEdit ? (
          <input
            className={`${styles.value} ${editableClass}`}
            id='text'
            type='text'
            value={newTodo.text}
            autoComplete='off'
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setNewTodo((prev) => ({
                ...prev,
                text: event.target.value,
              }));
            }}
          />
        ) : (
          <span className={styles.value}>{text}</span>
        )}
      </label>
      {type === TodoType.todo && (
        <div className={styles.contributor}>
          {!isEdit && (
            <button
              className={styles.contributor__action}
              type='button'
              onClick={() => {
                setIsEdit(true);
              }}
            >
              <SVG
                className={`${styles.contributor__icon} ${styles.contributor__icon_edit}`}
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <EditIcon />
              </SVG>
            </button>
          )}
          {isEdit && (
            <>
              <button
                className={styles.contributor__action}
                type='button'
                onClick={() => {
                  setNewTodo({
                    text,
                    startDay: formatTimestamp(startDay),
                    endDay: formatTimestamp(endDay),
                  });
                  setIsEdit(false);
                }}
              >
                <img
                  className={styles.contributor__icon}
                  src={crossIcon}
                  alt='cancel'
                />
              </button>
              <button
                className={styles.contributor__action}
                type='button'
                onClick={() => {
                  changeTodo({
                    id,
                    type,
                    text: newTodo.text,
                    startDay: parseDate(newTodo.startDay),
                    endDay: parseDate(newTodo.endDay),
                  });
                  setIsEdit(false);
                }}
              >
                <img
                  className={styles.contributor__icon}
                  src={checkIcon}
                  alt='add'
                />
              </button>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;
