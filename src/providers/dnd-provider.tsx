import type { PropsWithChildren, MouseEvent, TouchEvent } from 'react';
import {
  MouseSensor,
  TouchSensor,
  DndContext,
  useSensors,
  useSensor,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { customDragHandler } from '@/utilities/custom-drag-handler';
import { trashCollisionDetectionAlgorithm } from '@/utilities/trash-collision';

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

const DnDProvider = ({ children }: PropsWithChildren) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <DndContext
      collisionDetection={trashCollisionDetectionAlgorithm}
      sensors={sensors}
      modifiers={[restrictToWindowEdges]}
    >
      {children}
    </DndContext>
  );
};

export default DnDProvider;
