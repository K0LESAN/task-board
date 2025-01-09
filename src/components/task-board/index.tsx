import { type ChangeEvent, useState, useEffect } from 'react';
import {
  type DragEndEvent,
  type UniqueIdentifier,
  useDndMonitor,
} from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import type { Todo } from '@/shared/types';
import { sortAndFilterTodos } from '@/utilities/sort-and-filter-todos';
import { useDebounce } from '@/hooks/debounce';
import { useTodo } from '@/hooks/todo';
import searchIcon from '@/assets/icons/search.svg';
import { TodoType } from '@/shared/constants';
import BoardContainer from '../board-container';
import Container from '../container';
import LanguageSwitch from '../language-switch';
import * as styles from './index.module.scss';

const TaskBoard = () => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce<string>(searchText, 500);
  const { todos, changeTodo, removeTodo } = useTodo();
  const { t, i18n } = useTranslation();

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

      if (type !== todo.type) {
        changeTodo({
          ...todo,
          type,
        });
      }
    },
  });
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <Container>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('yourTasks')}</h1>
        <label className={styles.search} htmlFor='search'>
          <img
            className={styles.search__icon}
            src={searchIcon}
            alt={t('searchIconAlt')}
          />
          <input
            className={styles.search__field}
            id='search'
            value={searchText}
            autoComplete='off'
            type='text'
            placeholder={t('search')}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSearchText(event.target.value.trimStart());
            }}
          />
        </label>
      </header>
      <BoardContainer todos={sortAndFilterTodos(todos, debouncedSearchText)} />
      <LanguageSwitch />
    </Container>
  );
};

export default TaskBoard;
