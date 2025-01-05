import type { TagName } from './types';

enum TodoType {
  todo = 'todo',
  inProgress = 'in_progress',
  review = 'review',
  done = 'done',
}

enum TranlateTodoType {
  todo = 'To Do',
  in_progress = 'In Progress',
  review = 'Review',
  done = 'Done',
}

const ignoreTags: TagName[] = [
  'button',
  'input',
  'a',
  'input',
  'textarea',
  'select',
  'option',
];

export { ignoreTags, TodoType, TranlateTodoType };
