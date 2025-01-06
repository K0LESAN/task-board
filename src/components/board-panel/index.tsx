import trashIcon from '@/assets/icons/trash.svg';
import smileImage from '@/assets/icons/smile.svg';
import ghostImage from '@/assets/icons/ghost.svg';
import happyImage from '@/assets/icons/happy.svg';
import upsideDownImage from '@/assets/icons/upside-down.svg';
import { TodoType, TranlateTodoType } from '@/constants';
import { useTodo } from '@/hooks/todo';
import * as styles from './index.module.scss';

interface Props {
  type: TodoType;
}

const BoardPanel = ({ type }: Props) => {
  const { createTodo, clearTodosByType } = useTodo();
  const tranlateTodoType = TranlateTodoType[type];
  const imagesByTodoType = {
    [TodoType.todo]: happyImage,
    [TodoType.inProgress]: smileImage,
    [TodoType.review]: upsideDownImage,
    [TodoType.done]: ghostImage,
  };

  return (
    <div className={styles.panel}>
      <div className={styles.type}>
        <img
          className={styles.icon}
          src={imagesByTodoType[type]}
          alt={tranlateTodoType}
        />
        <h2 className={styles.title}>{tranlateTodoType}</h2>
      </div>
      {type === TodoType.todo && (
        <button
          className={styles.add}
          type='button'
          onClick={() => {
            const currentTimestamp: number = new Date().getTime();

            createTodo({
              text: '',
              startDay: currentTimestamp,
              endDay: currentTimestamp,
            });
          }}
        >
          + Добавить
        </button>
      )}
      {type === TodoType.done && (
        <button
          type='button'
          onClick={() => {
            clearTodosByType(TodoType.done);
          }}
        >
          <img className={styles.trash} src={trashIcon} alt='remove' />
        </button>
      )}
    </div>
  );
};

export default BoardPanel;
