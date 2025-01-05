import editIcon from '@/assets/icons/edit.svg';
import crossIcon from '@/assets/icons/cross.svg';
import checkIcon from '@/assets/icons/check.svg';
import * as styles from './index.module.scss';

const TodoButtons = () => {
  return (
    <div className={styles.buttons}>
      <button className={styles.edit} type='button'>
        <img className={styles.edit__icon} src={editIcon} alt='edit' />
      </button>
      <button className={styles.edit} type='button'>
        <img className={styles.edit__icon} src={crossIcon} alt='remove' />
      </button>
      <button className={styles.edit} type='button'>
        <img className={styles.edit__icon} src={checkIcon} alt='add' />
      </button>
    </div>
  );
};

export default TodoButtons;
