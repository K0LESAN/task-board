import type { ComponentProps } from 'react';
import * as styles from './index.module.scss';

const ContributorAction = ({
  children,
  type = 'button',
  ...props
}: ComponentProps<'button'>) => {
  return (
    <button className={styles.action} type={type} {...props}>
      {children}
    </button>
  );
};

export default ContributorAction;
