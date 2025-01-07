import { type ChangeEvent, useState } from 'react';
import type { Todo } from '@/shared/types';
import { TodoType } from '@/shared/constants';
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

type TodoError = Record<keyof TodoForm, boolean>;

const initialTodoError = {
  text: false,
  startDay: false,
  endDay: false,
};

const TodoItem = ({ todo: { id, type, startDay, endDay, text } }: Props) => {
  const isExpired: boolean =
    type !== TodoType.done && endDay - new Date().getTime() <= 0;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<TodoForm>({
    text,
    startDay: formatTimestamp(startDay),
    endDay: formatTimestamp(endDay),
  });
  const [todoError, setTodoError] = useState<TodoError>(initialTodoError);
  const { changeTodo } = useTodo();
  const getErrorClass = (type: keyof TodoForm) =>
    isEdit && todoError[type] ? styles.error : '';
  const expiredClass: string = !isEdit && isExpired ? styles.expired : '';
  let disabledEdit: boolean = false;

  for (const typeError in todoError) {
    if (todoError[typeError as keyof TodoError]) {
      disabledEdit = true;
      break;
    }
  }

  return (
    <Draggable
      key={id}
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
          className={`${styles.value} ${getErrorClass('startDay')}`}
          type='text'
          id='start-day'
          disabled={!isEdit}
          value={isEdit ? newTodo.startDay : formatTimestamp(startDay)}
          autoComplete='off'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setTodoError(
              (prev: TodoError): TodoError => ({
                ...prev,
                startDay: !Boolean(parseDate(event.target.value)),
              })
            );
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
          className={`${styles.value} ${getErrorClass(
            'endDay'
          )} ${expiredClass}`}
          type='text'
          id='end-day'
          disabled={!isEdit}
          value={isEdit ? newTodo.endDay : formatTimestamp(endDay)}
          autoComplete='off'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setTodoError(
              (prev: TodoError): TodoError => ({
                ...prev,
                endDay: !Boolean(parseDate(event.target.value)),
              })
            );
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
            className={`${styles.value} ${getErrorClass('text')}`}
            id='text'
            type='text'
            value={newTodo.text}
            autoComplete='off'
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setTodoError(
                (prev: TodoError): TodoError => ({
                  ...prev,
                  text: !Boolean(event.target.value.length),
                })
              );
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
                setTodoError(initialTodoError);
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
                  setTodoError(initialTodoError);
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
                disabled={disabledEdit}
                onClick={() => {
                  setTodoError(initialTodoError);
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
