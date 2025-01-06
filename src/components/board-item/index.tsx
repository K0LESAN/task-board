import type { Todo } from '@/types';
import { TodoType } from '@/constants';
import TodoItem from '../todo-item';
import Draggable from '../draggable';
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
        {todos.map((todo: Todo) => {
          return (
            <Draggable
              key={todo.id}
              id={todo.id}
              draggableClass={styles.draggable}
              classNames={styles.todo}
              data={todo}
            >
              <TodoItem todo={todo} />
            </Draggable>
          );
        })}
      </div>
    </div>
  );
};

export default BoardItem;
