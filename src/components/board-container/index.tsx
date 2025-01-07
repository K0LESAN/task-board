import type { Todo } from '@/shared/types';
import { TodoType } from '@/shared/constants';
import { useDndContext } from '@dnd-kit/core';
import BoardItem from '../board-item';
import Droppable from '../droppable';
import TodoOverlay from '../todo-overlay';
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
  const { active } = useDndContext();
  const classes = [styles.boards];

  for (const todo of todos) {
    filteredTodos[todo.type].push(todo);
  }

  if (active) {
    classes.push(styles.boards_active);
  }

  return (
    <main className={classes.join(' ')}>
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
      <TodoOverlay />
    </main>
  );
};

export default BoardContainer;
