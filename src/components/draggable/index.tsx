import type { HTMLAttributes, CSSProperties, PropsWithChildren } from 'react';
import { type UseDraggableArguments, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

type Props<T = HTMLElement> = {
  classNames?: string | string[];
  draggableArguments: UseDraggableArguments;
} & PropsWithChildren &
  HTMLAttributes<T>;

const Draggable = ({
  children,
  classNames = '',
  draggableArguments,
  ...htmlAttributes
}: Props) => {
  const { disabled } = draggableArguments;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      ...draggableArguments,
      disabled: disabled !== undefined ? disabled : false,
    });
  const style: CSSProperties = isDragging
    ? {
        opacity: 0,
        pointerEvents: 'none',
      }
    : {};
  const classes: string[] = [];

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
      {...htmlAttributes}
    >
      {children}
    </div>
  );
};

export default Draggable;
