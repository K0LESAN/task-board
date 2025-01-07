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
import TodoField from '../todo-field';

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
  const expiredClass: string = !isEdit && isExpired ? styles.expired : '';
  let disabledEdit: boolean = false;

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
      <TodoField
        labelText='Начало:'
        autoComplete='off'
        disabled={!isEdit}
        value={newTodo.startDay}
        validate={() => Boolean(parseDate(newTodo.startDay))}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setNewTodo(
            (prev: TodoForm): TodoForm => ({
              ...prev,
              startDay: event.target.value,
            })
          );
        }}
      />
      <TodoField
        labelText='Окончание:'
        autoComplete='off'
        disabled={!isEdit}
        className={expiredClass}
        value={newTodo.endDay}
        validate={() => Boolean(parseDate(newTodo.endDay))}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setNewTodo(
            (prev: TodoForm): TodoForm => ({
              ...prev,
              endDay: event.target.value,
            })
          );
        }}
      />
      <TodoField
        labelText='Описание:'
        autoComplete='off'
        disabled={!isEdit}
        value={newTodo.text}
        disabledText={text}
        validate={() => newTodo.text.length > 0}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setNewTodo(
            (prev: TodoForm): TodoForm => ({
              ...prev,
              text: event.target.value,
            })
          );
        }}
      />
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
                disabled={disabledEdit}
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
