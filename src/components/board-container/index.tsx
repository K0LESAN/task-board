import type { Todo } from '@/types';
import { TodoType } from '@/constants';
import BoardItem from '../board-item';
import Droppable from '../droppable';
import * as styles from './index.module.scss';

interface Props {
  todos: Todo[];
}

const BoardContainer = ({ todos }: Props) => {
  const filteredTodos: Record<TodoType, Todo[]> = {
    [TodoType.todo]: [],
    [TodoType.inProgress]: [],
    [TodoType.review]: [],
    [TodoType.done]: [],
  };

  for (const todo of todos) {
    filteredTodos[todo.type].push(todo);
  }

  return (
    <div className={styles.boards}>
      {Object.entries(filteredTodos).map(([type, todos]: [string, Todo[]]) => {
        return (
          <Droppable
            key={type}
            id={type}
            classNames={styles.board}
            droppableClass={styles.droppable}
          >
            <BoardItem todos={todos} type={type as TodoType} />
          </Droppable>
        );
      })}
    </div>
  );
};

export default BoardContainer;
