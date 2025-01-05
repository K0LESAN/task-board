import type { Todo } from '@/types';
import { TodoType, TranlateTodoType } from '@/constants';
import trashIcon from '@/assets/icons/trash.svg';
import smileImage from '@/assets/icons/smile.svg';
import ghostImage from '@/assets/icons/ghost.svg';
import happyImage from '@/assets/icons/happy.svg';
import upsideDownImage from '@/assets/icons/upside-down.svg';
import TodoItem from '../todo-item';
import * as styles from './index.module.scss';

interface Props {
  todos: Todo[];
  type: TodoType;
}

const BoardItem = ({ todos, type }: Props) => {
  const tranlateTodoType = TranlateTodoType[type];
  const imagesByTodoType = {
    [TodoType.todo]: happyImage,
    [TodoType.inProgress]: smileImage,
    [TodoType.review]: upsideDownImage,
    [TodoType.done]: ghostImage,
  };

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <div className={styles.type}>
          <img
            className={styles.icon}
            src={imagesByTodoType[type]}
            alt={tranlateTodoType}
          />
          <h2 className={styles.title}>{tranlateTodoType}</h2>
        </div>
        {type === TodoType.todo && (
          <button className={styles.add} type='button'>
            + Добавить
          </button>
        )}
        {type === TodoType.done && (
          <button type='button'>
            <img className={styles.trash} src={trashIcon} alt='remove' />
          </button>
        )}
      </div>
      <div className={styles.todos}>
        {todos.map((todo: Todo) => {
          return <TodoItem todo={todo} />;
        })}
      </div>
    </div>
  );
};

export default BoardItem;
