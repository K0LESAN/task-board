import type { ComponentProps } from 'react';
import * as styles from './index.module.scss';

const ContributorAction = ({
  children,
  type = 'button',
  className,
  ...props
}: ComponentProps<'button'>) => {
  const classes: string[] = [styles.action];

  if (className) {
    classes.push(className);
  }

  return (
    <button className={classes.join(' ')} type={type} {...props}>
      {children}
    </button>
  );
};

export default ContributorAction;
