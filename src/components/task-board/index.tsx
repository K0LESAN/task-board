import { useState, useEffect, Suspense } from 'react';
import {
  type DragEndEvent,
  type UniqueIdentifier,
  useDndMonitor,
} from '@dnd-kit/core';
import type { Todo } from '@/shared/types';
import { sortAndFilterTodos } from '@/utilities/sort-and-filter-todos';
import { useTodo } from '@/hooks/todo';
import { TodoType } from '@/shared/constants';
import BoardContainer from '../board-container';
import Container from '../container';
import LanguageSwitch from '../language-switch';
import Header from '../header';

const TaskBoard = () => {
  const { todos, changeTodo, removeTodo } = useTodo();
  const [searchText, setSearchText] = useState<string>('');

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
      <Suspense>
        <Header setSearchText={setSearchText} />
      </Suspense>
      <BoardContainer todos={sortAndFilterTodos(todos, searchText)} />
      <Suspense>
        <LanguageSwitch />
      </Suspense>
    </Container>
  );
};

export default TaskBoard;
