import type { Todo } from '@/shared/types';
import { TodoType } from '@/shared/constants';
import TodoItem from '../todo-item';
import BoardPanel from '../board-panel';
import * as styles from './index.module.scss';
import { Suspense } from 'react';

interface Props {
  todos: Todo[];
  type: TodoType;
}

const BoardItem = ({ todos, type }: Props) => {
  return (
    <div className={styles.board}>
      <Suspense>
        <BoardPanel type={type} />
      </Suspense>
      <div className={styles.todos}>
        {todos.map((todo: Todo) => (
          <Suspense>
            <TodoItem key={todo.id} todo={todo} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default BoardItem;
