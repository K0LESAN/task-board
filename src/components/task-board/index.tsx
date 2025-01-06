import { type ChangeEvent, useState, useEffect } from 'react';
import { sortAndFilterTodos } from '@/utilities/sort-and-filter-todos';
import { useDebounce } from '@/hooks/debounce';
import { useTodo } from '@/hooks/todo';
import searchIcon from '@/assets/icons/search.svg';
import BoardContainer from '../board-container';
import * as styles from './index.module.scss';

const TaskBoard = () => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce<string>(searchText, 500);
  const { todos, initTodos } = useTodo();

  useEffect(() => {
    initTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
            autoComplete='off'
            type='text'
            placeholder='поиск...'
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSearchText(event.target.value.trimStart());
            }}
          />
        </label>
      </header>
      <BoardContainer todos={sortAndFilterTodos(todos, debouncedSearchText)} />
    </>
  );
};

export default TaskBoard;
