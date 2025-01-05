import { TodoType } from './constants';

interface Todo {
  id: number;
  type: TodoType;
  startDay: number;
  endDay: number;
  text: string;
}

type TagName = keyof HTMLElementTagNameMap;

export type { TagName, Todo };
