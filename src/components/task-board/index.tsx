import { type ChangeEvent, useState } from 'react';
import searchIcon from '@/assets/icons/search.svg';
import * as styles from './index.module.scss';

const TaskBoard = () => {
  const [searchText, setSearchText] = useState<string>('');

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
        <div className={styles.boards}></div>
      </main>
    </>
  );
};

export default TaskBoard;
