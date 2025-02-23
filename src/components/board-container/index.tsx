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
  const classes = [styles.boards];

  for (const todo of todos) {
    filteredTodos[todo.type].push(todo);
  }

  return (
    <main className={classes.join(' ')}>
      {Object.entries(filteredTodos).map(([type, todos]: [string, Todo[]]) => {
        return (
          <Droppable key={type} id={type} droppableClass={styles.droppable}>
            <div className={styles.board}>
              <BoardItem todos={todos} type={type as TodoType} />
            </div>
          </Droppable>
        );
      })}
      <TodoOverlay />
    </main>
  );
};

export default BoardContainer;
