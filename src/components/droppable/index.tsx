import type { CSSProperties, PropsWithChildren } from 'react';
import { type UseDroppableArguments, useDroppable } from '@dnd-kit/core';

type Props = {
  droppableClass?: string;
} & UseDroppableArguments &
  PropsWithChildren;

const Droppable = ({
  children,
  droppableClass = '',
  ...droppableArguments
}: Props) => {
  const { setNodeRef, isOver } = useDroppable(droppableArguments);

  return (
    <div
      ref={setNodeRef}
      className={droppableClass && isOver ? droppableClass : ''}
    >
      {children}
    </div>
  );
};

export default Droppable;
