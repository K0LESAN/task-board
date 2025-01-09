import type { DefaultLanguage, Languages, TagName } from './types';

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
  'a',
  'select',
  'option',
  'label',
  'input',
];

const defaultLanguage: DefaultLanguage = 'ru';

const languages: Languages[] = [defaultLanguage, 'en'];

export { ignoreTags, TodoType, TranlateTodoType, defaultLanguage, languages };
