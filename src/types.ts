import { TodoType } from './constants';

interface Todo {
  id: number;
  type: TodoType;
  startDay: number;
  endDay: number;
  text: string;
}

interface TodoContext {
  readonly todos: Todo[];
  initTodos(newTodos: Todo[]): void;
  addTodo(newTodo: Todo): void;
  removeTodo(id: number): void;
  changeTodo(newTodo: Todo): void;
  clearTodos(): void;
  clearTodosByType(clearType: TodoType): void;
}

type TagName = keyof HTMLElementTagNameMap;

export type { TagName, Todo, TodoContext };
