import type { CSSProperties, PropsWithChildren } from 'react';
import { type UseDroppableArguments, useDroppable } from '@dnd-kit/core';

type Props = {
  droppableClass?: string;
  classNames?: string | string[];
} & UseDroppableArguments &
  PropsWithChildren;

const Droppable = ({
  children,
  droppableClass = '',
  classNames = '',
  ...droppableArguments
}: Props) => {
  const { setNodeRef, isOver } = useDroppable(droppableArguments);
  const classes: string[] = [];

  if (droppableClass && isOver) {
    classes.push(droppableClass);
  }

  if (classNames) {
    if (Array.isArray(classNames)) {
      classes.push(...classNames);
    } else {
      classes.push(classNames);
    }
  }

  return (
    <div ref={setNodeRef} className={classes.join(' ')}>
      {children}
    </div>
  );
};

export default Droppable;
