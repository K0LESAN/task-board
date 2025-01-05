import type { Todo } from '@/types';
import { TodoType } from '@/constants';
import BoardItem from '../board-item';
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
        return <BoardItem key={type} todos={todos} type={type as TodoType} />;
      })}
    </div>
  );
};

export default BoardContainer;
