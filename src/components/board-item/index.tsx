import type { Todo } from '@/types';
import { TodoType } from '@/constants';
import TodoItem from '../todo-item';
import BoardPanel from '../board-panel';
import * as styles from './index.module.scss';

interface Props {
  todos: Todo[];
  type: TodoType;
}

const BoardItem = ({ todos, type }: Props) => {
  return (
    <div className={styles.board}>
      <BoardPanel type={type} />
      <div className={styles.todos}>
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default BoardItem;
