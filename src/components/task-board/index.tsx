import { type ChangeEvent, useState, useEffect } from 'react';
import type { Todo } from '@/types';
import { sortAndFilterTodos } from '@/utilities/sort-and-filter-todos';
import { useDebounce } from '@/hooks/debounce';
import searchIcon from '@/assets/icons/search.svg';
import * as styles from './index.module.scss';
import BoardContainer from '../board-container';

const TaskBoard = () => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce<string>(searchText, 500);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storageTodos: string | null = localStorage.getItem('todos');
    const parsedTodos: Todo[] = storageTodos ? JSON.parse(storageTodos) : [];

    if (parsedTodos.length) {
      setTodos(parsedTodos);
    } else {
      import('@/assets/tasks.json').then((importData): void => {
        setTodos(importData.default as Todo[]);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Your tasks</h1>
        <label className={styles.search} htmlFor='search'>
          <img className={styles.search__icon} src={searchIcon} alt='поиск' />
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
