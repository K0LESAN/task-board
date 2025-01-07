import { type ChangeEvent, useState } from 'react';
import type { Todo } from '@/shared/types';
import { TodoType } from '@/shared/constants';
import { formatTimestamp } from '@/utilities/format-timestamp';
import { useTodo } from '@/hooks/todo';
import { parseDate } from '@/utilities/parse-date';
import Draggable from '../draggable';
import TodoField from '../todo-field';
import Contributor from '../contributor';
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
  const expiredClass: string = !isEdit && isExpired ? styles.expired : '';

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
      tagName={'form'}
      classNames={styles.todo}
      title={text}
      data-disabled={!isEdit}
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
      {type === TodoType.todo && <Contributor isEdit={isEdit} />}
    </Draggable>
  );
};

export default TodoItem;
