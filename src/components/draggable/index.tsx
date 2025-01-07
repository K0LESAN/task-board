import {
  type HTMLAttributes,
  type CSSProperties,
  type PropsWithChildren,
  type ElementType,
  createElement,
} from 'react';
import { type UseDraggableArguments, useDraggable } from '@dnd-kit/core';

type Props<T = HTMLElement> = {
  classNames?: string | string[];
  draggableArguments: UseDraggableArguments;
  tagName?: ElementType;
} & PropsWithChildren &
  Omit<HTMLAttributes<T>, 'className'>;

const Draggable = ({
  draggableArguments,
  style: argStyle = {},
  classNames = '',
  children,
  tagName,
  ...htmlAttributes
}: Props) => {
  const {
    setNodeRef: ref,
    attributes,
    listeners,
    isDragging,
  } = useDraggable(draggableArguments);
  const style: CSSProperties = isDragging
    ? {
        ...argStyle,
        opacity: 0,
        pointerEvents: 'none',
      }
    : argStyle;
  const className: string = Array.isArray(classNames)
    ? classNames.join(' ')
    : classNames;

  return createElement(
    tagName || 'div',
    {
      ref,
      className,
      style,
      ...listeners,
      ...attributes,
      ...htmlAttributes,
    },
    children
  );
};

export default Draggable;
