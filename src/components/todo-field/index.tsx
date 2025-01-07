import { ComponentProps, useId } from 'react';
import * as styles from './index.module.scss';

interface Props extends Omit<ComponentProps<'input'>, 'id' | 'htmlFor'> {
  validate?: () => boolean;
  labelText: string;
  disabledText?: string;
}

const TodoField = ({
  validate = () => true,
  labelText,
  className,
  children,
  disabledText,
  ...props
}: Props) => {
  const inputClasses: string[] = [styles.value];
  const wrapperClasses: string[] = [styles.wrapper];
  const id: string = useId();

  if (!validate()) {
    wrapperClasses.push(styles.error);
  }

  if (className) {
    inputClasses.push(className);
  }

  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.label}>{labelText}</span>
      <div className={wrapperClasses.join(' ')}>
        {disabledText && <span className={styles.text}>{disabledText}</span>}
        <input
          type='text'
          className={inputClasses.join(' ')}
          id={id}
          {...props}
        />
      </div>
    </label>
  );
};

export default TodoField;
