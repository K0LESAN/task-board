import {
  type Collision,
  type DroppableContainer,
  type CollisionDetection,
  closestCorners,
  rectIntersection,
} from '@dnd-kit/core';

export const trashCollisionDetectionAlgorithm: CollisionDetection = ({
  droppableContainers,
  ...collisionArguments
}): Collision[] => {
  const rectIntersectionCollisions: Collision[] = rectIntersection({
    ...collisionArguments,
    droppableContainers: droppableContainers.filter(
      ({ id }: DroppableContainer): boolean => id === 'remove'
    ),
  });

  if (rectIntersectionCollisions.length > 0) {
    return rectIntersectionCollisions;
  }

  return closestCorners({
    ...collisionArguments,
    droppableContainers: droppableContainers.filter(
      ({ id }: DroppableContainer): boolean => id !== 'remove'
    ),
  });
};
