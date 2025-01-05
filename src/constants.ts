import type { TagName } from './types';

enum TodoType {
  todo = 'todo',
  inProgress = 'in_progress',
  review = 'review',
  done = 'done',
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

export { ignoreTags, TodoType };
