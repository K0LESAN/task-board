import type { DefaultLanguage, Languages, TagName } from './types';

enum TodoType {
  todo = 'todo',
  inProgress = 'in_progress',
  review = 'review',
  done = 'done',
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

export { ignoreTags, TodoType, defaultLanguage, languages };
