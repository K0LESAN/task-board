import { type CSSProperties, type PropsWithChildren } from 'react';
import { type UseDraggableArguments, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  draggingClass?: string;
} & UseDraggableArguments &
  PropsWithChildren;

const Draggable = ({
  children,
  draggingClass = '',
  ...draggableArguments
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      ...draggableArguments,
      disabled: false,
    });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      className={draggingClass && isDragging ? draggingClass : ''}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default Draggable;
