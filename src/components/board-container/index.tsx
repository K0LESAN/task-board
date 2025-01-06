import type { Todo } from '@/shared/types';
import { TodoType } from '@/shared/constants';
import BoardItem from '../board-item';
import Droppable from '../droppable';
import * as styles from './index.module.scss';
import { useDndContext } from '@dnd-kit/core';

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

  for (const todo of todos) {
    filteredTodos[todo.type].push(todo);
  }
  console.log(active);
  return (
    <main className={`${styles.boards} ${active ? styles.boards_active : ''}`}>
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
    </main>
  );
};

export default BoardContainer;
