import type { Todo } from '@/shared/types';
import { parseDate } from './parse-date';
import { checkBetweenDate } from './check-between-date';
import { hasTextInTodo } from './has-text-in-todo';

export function sortAndFilterTodos(todos: Todo[], searchText: string): Todo[] {
  const milliseconds: number = parseDate(searchText);
  const filterFunction = Number.isNaN(milliseconds)
    ? hasTextInTodo(searchText)
    : checkBetweenDate(searchText);

  return todos
    .filter(filterFunction)
    .sort((a: Todo, b: Todo) => a.startDay - b.startDay);
}
