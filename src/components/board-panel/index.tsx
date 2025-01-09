import { useTranslation } from 'react-i18next';
import smileImage from '@/assets/icons/smile.svg';
import ghostImage from '@/assets/icons/ghost.svg';
import happyImage from '@/assets/icons/happy.svg';
import upsideDownImage from '@/assets/icons/upside-down.svg';
import { TodoType } from '@/shared/constants';
import { useTodo } from '@/hooks/todo';
import SVG from '../svg';
import TrashIcon from '../trash-icon';
import Droppable from '../droppable';
import * as styles from './index.module.scss';

interface Props {
  type: TodoType;
}

const BoardPanel = ({ type }: Props) => {
  const { createTodo, clearTodosByType } = useTodo();
  const { t } = useTranslation();
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
          alt={t(type, type)}
        />
        <h2 className={styles.title}>{t(type, type)}</h2>
      </div>
      {type === TodoType.todo && (
        <button
          className={styles.add}
          type='button'
          onClick={() => {
            const currentTimestamp: number = new Date().getTime();

            createTodo({
              text: t('description'),
              startDay: currentTimestamp,
              endDay: currentTimestamp,
            });
          }}
        >
          {t('add')}
        </button>
      )}
      {type === TodoType.done && (
        <Droppable id={'remove'} droppableClass={styles.droppable}>
          <button
            type='button'
            onClick={() => {
              clearTodosByType(TodoType.done);
            }}
          >
            <SVG
              className={styles.trash}
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <TrashIcon />
            </SVG>
          </button>
        </Droppable>
      )}
    </div>
  );
};

export default BoardPanel;
