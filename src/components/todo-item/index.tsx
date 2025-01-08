import { type ChangeEvent, type FormEvent, useState } from 'react';
import type { Todo } from '@/shared/types';
import crossIcon from '@/assets/icons/cross.svg';
import checkIcon from '@/assets/icons/check.svg';
import { TodoType } from '@/shared/constants';
import { formatTimestamp } from '@/utilities/format-timestamp';
import { useTodo } from '@/hooks/todo';
import { parseDate } from '@/utilities/parse-date';
import Draggable from '../draggable';
import TodoField from '../todo-field';
import ContributorAction from '../contributor-action';
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
  const initialTodoForm: TodoForm = {
    text,
    startDay: formatTimestamp(startDay),
    endDay: formatTimestamp(endDay),
  };
  const [newTodo, setNewTodo] = useState<TodoForm>(initialTodoForm);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { changeTodo } = useTodo();
  const isExpired: boolean =
    type !== TodoType.done && endDay - new Date().getTime() <= 0;
  const expiredClass: string = !isEdit && isExpired ? styles.expired : '';
  const validDate = (date: string): boolean => Boolean(parseDate(date));
  const validTodoForm = (): boolean =>
    validDate(newStartDay) && validDate(newEndDay) && newText.length > 0;
  const {
    text: newText,
    startDay: newStartDay,
    endDay: newEndDay,
  }: TodoForm = newTodo;

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
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validTodoForm()) {
          return;
        }

        setIsEdit(false);
        changeTodo({
          id,
          type,
          text: newText,
          startDay: parseDate(newStartDay),
          endDay: parseDate(newEndDay),
        });
      }}
    >
      <TodoField
        labelText='Начало:'
        autoComplete='off'
        disabled={!isEdit}
        value={newStartDay}
        placeholder='dd.mm.yyyy'
        validate={() => validDate(newStartDay)}
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
        value={newEndDay}
        placeholder='dd.mm.yyyy'
        validate={() => validDate(newEndDay)}
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
        value={newText}
        placeholder='описание...'
        disabledText={text}
        validate={() => newText.length > 0}
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
          <ContributorAction
            className={!isEdit ? styles.hide : ''}
            onClick={() => {
              setNewTodo(initialTodoForm);
              setIsEdit(false);
            }}
          >
            <img
              className={styles.contributor__icon}
              src={crossIcon}
              alt='cancel'
            />
          </ContributorAction>
          <ContributorAction
            disabled={!validTodoForm()}
            className={!isEdit ? styles.hide : ''}
            type='submit'
          >
            <img
              className={styles.contributor__icon}
              src={checkIcon}
              alt='add'
            />
          </ContributorAction>
          <ContributorAction
            className={isEdit ? styles.hide : ''}
            onClick={() => {
              setNewTodo(initialTodoForm);
              setIsEdit(true);
            }}
          >
            <SVG
              className={styles.contributor__icon}
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <EditIcon />
            </SVG>
          </ContributorAction>
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;
