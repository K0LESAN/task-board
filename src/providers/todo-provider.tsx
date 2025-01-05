import type { Todo, TodoContext } from '@/types';
import { TodoType } from '@/constants';
import { createContext, useState, type PropsWithChildren } from 'react';

export const todoContext = createContext<TodoContext>({
  todos: [],
  addTodo() {},
  changeTodo() {},
  clearTodos() {},
  clearTodosByType() {},
  initTodos() {},
  removeTodo() {},
});

const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const initTodos = (newTodos: Todo[]): void => {
    setTodos(newTodos);
  };
  const addTodo = (newTodo: Omit<Todo, 'id' | 'type'>): void => {
    const maxId: number = todos.reduce(
      (accMaxId: number, { id }: Todo): number => {
        return accMaxId > id ? accMaxId : id;
      },
      0
    );

    setTodos((prev: Todo[]): Todo[] => {
      return [
        ...prev,
        {
          id: maxId + 1,
          type: TodoType.todo,
          ...newTodo,
        },
      ];
    });
  };
  const removeTodo = (id: number): void => {
    const newTodos = todos.filter(({ id: todoId }: Todo): boolean => {
      return todoId !== id;
    });

    if (todos.length !== newTodos.length) {
      setTodos(newTodos);
    }
  };
  const changeTodo = (newTodo: Todo): void => {
    const newTodos = todos.filter(({ id: todoId }: Todo): boolean => {
      return todoId !== newTodo.id;
    });

    if (todos.length !== newTodos.length) {
      setTodos([...newTodos, newTodo]);
    }
  };
  const clearTodosByType = (clearType: TodoType): void => {
    const newTodos = todos.filter(({ type }: Todo): boolean => {
      return clearType !== type;
    });

    setTodos(newTodos);
  };
  const clearTodos = (): void => {
    setTodos([]);
  };

  return (
    <todoContext.Provider
      value={{
        todos,
        addTodo,
        changeTodo,
        clearTodos,
        clearTodosByType,
        initTodos,
        removeTodo,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};

export default TodoProvider;
