import { type ChangeEvent, useState, useEffect } from 'react';
import {
  type DragEndEvent,
  type UniqueIdentifier,
  useDndMonitor,
} from '@dnd-kit/core';
import { TodoType } from '@/constants';
import type { Todo } from '@/types';
import { sortAndFilterTodos } from '@/utilities/sort-and-filter-todos';
import { useDebounce } from '@/hooks/debounce';
import { useTodo } from '@/hooks/todo';
import searchIcon from '@/assets/icons/search.svg';
import BoardContainer from '../board-container';
import * as styles from './index.module.scss';

const TaskBoard = () => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce<string>(searchText, 500);
  const { todos, initTodos, removeTodo, changeTodo } = useTodo();

  useEffect(() => {
    const storageTodos: string | null = localStorage.getItem('todos');
    const parsedTodos: Todo[] = storageTodos ? JSON.parse(storageTodos) : [];

    if (parsedTodos.length) {
      initTodos(parsedTodos);
    } else {
      import('@/assets/tasks.json').then((importData): void => {
        initTodos(importData.default as Todo[]);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  useDndMonitor({
    onDragEnd({ over, active }: DragEndEvent) {
      if (!over) {
        return;
      }

      const overId: UniqueIdentifier = over.id;
      const todo: Todo = active.data.current as Todo;

      if (overId === 'remove') {
        removeTodo(todo.id);
        return;
      }

      const type: TodoType = overId as TodoType;

      if (type === todo.type) {
        return;
      }

      changeTodo({
        ...todo,
        type,
      });
    },
  });

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Your tasks</h1>
        <label className={styles.search} htmlFor='search'>
          <img className={styles.search__icon} src={searchIcon} alt='search' />
          <input
            className={styles.search__field}
            id='search'
            value={searchText}
            type='text'
            placeholder='поиск...'
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSearchText(event.target.value.trimStart());
            }}
          />
        </label>
      </header>
      <main>
        <BoardContainer
          todos={sortAndFilterTodos(todos, debouncedSearchText)}
        />
      </main>
    </>
  );
};

export default TaskBoard;
