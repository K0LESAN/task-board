import { type CSSProperties, type PropsWithChildren } from 'react';
import { type UseDraggableArguments, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  draggableClass?: string;
  classNames?: string | string[];
} & UseDraggableArguments &
  PropsWithChildren;

const Draggable = ({
  children,
  draggableClass = '',
  classNames = '',
  ...draggableArguments
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      ...draggableArguments,
      disabled: false,
    });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    cursor: isDragging ? 'grabbing' : 'grab',
  };
  const classes: string[] = [];

  if (draggableClass && isDragging) {
    classes.push(draggableClass);
  }

  if (classNames) {
    if (Array.isArray(classNames)) {
      classes.push(...classNames);
    } else {
      classes.push(classNames);
    }
  }

  return (
    <div
      ref={setNodeRef}
      className={classes.join(' ')}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default Draggable;
