import type {
  PropsWithChildren,
  MouseEvent,
  TouchEvent,
  PointerEvent,
} from 'react';
import {
  PointerSensor,
  MouseSensor,
  TouchSensor,
  DndContext,
  useSensors,
  useSensor,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { customDragHandler } from '@/utilities/custom-drag-handler';

MouseSensor.activators = [
  {
    eventName: 'onMouseDown',
    handler: ({ nativeEvent: event }: MouseEvent) => {
      return customDragHandler(event.target);
    },
  },
];

TouchSensor.activators = [
  {
    eventName: 'onTouchStart',
    handler: ({ nativeEvent: event }: TouchEvent) => {
      return customDragHandler(event.target);
    },
  },
];

PointerSensor.activators = [
  {
    eventName: 'onPointerDown',
    handler: ({ nativeEvent: event }: PointerEvent) => {
      return customDragHandler(event.target);
    },
  },
];

export default function DnDProvider({ children }: PropsWithChildren) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  return (
    <DndContext sensors={sensors} modifiers={[restrictToWindowEdges]}>
      {children}
    </DndContext>
  );
}
