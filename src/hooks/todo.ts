import { useContext } from 'react';
import type { TodoContext } from '@/shared/types';
import { todoContext } from '../providers/todo-provider';

export function useTodo(): TodoContext {
  const value: TodoContext = useContext<TodoContext>(todoContext);

  return value;
}
