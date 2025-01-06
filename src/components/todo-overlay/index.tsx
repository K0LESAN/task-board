import { type DragStartEvent, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import type { Todo } from '@/shared/types';
import TodoItem from '../todo-item';
import * as styles from './index.module.scss';

const TodoOverlay = () => {
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  useDndMonitor({
    onDragStart({ active }: DragStartEvent) {
      const todo: Todo | undefined = active.data.current as Todo | undefined;

      if (todo) {
        setActiveTodo(todo);
      }
    },
    onDragEnd() {
      setActiveTodo(null);
    },
  });

  return (
    <DragOverlay className={styles.overlay}>
      {activeTodo ? <TodoItem todo={activeTodo} /> : null}
    </DragOverlay>
  );
};

export default TodoOverlay;
