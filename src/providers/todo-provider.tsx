import type { Todo, TodoContext } from '@/types';
import { TodoType } from '@/constants';
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react';

export const todoContext = createContext<TodoContext>({
  todos: [],
  changeTodo() {},
  createTodo() {},
  clearTodos() {},
  clearTodosByType() {},
  initTodos() {},
  removeTodo() {},
});

const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const initTodos = useCallback((newTodos: Todo[]): void => {
    setTodos(newTodos);
  }, []);
  const createTodo = useCallback(
    (newTodo: Omit<Todo, 'id' | 'type'>): void => {
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
    },
    [todos]
  );
  const removeTodo = useCallback(
    (id: number): void => {
      const newTodos = todos.filter(({ id: todoId }: Todo): boolean => {
        return todoId !== id;
      });

      if (todos.length !== newTodos.length) {
        setTodos(newTodos);
      }
    },
    [todos]
  );
  const changeTodo = useCallback(
    (newTodo: Todo): void => {
      const newTodos = todos.filter(({ id: todoId }: Todo): boolean => {
        return todoId !== newTodo.id;
      });

      if (todos.length !== newTodos.length) {
        setTodos([...newTodos, newTodo]);
      }
    },
    [todos]
  );
  const clearTodosByType = useCallback(
    (clearType: TodoType): void => {
      const newTodos = todos.filter(({ type }: Todo): boolean => {
        return clearType !== type;
      });
      console.log(todos, clearType);
      setTodos(newTodos);
    },
    [todos]
  );
  const clearTodos = useCallback((): void => {
    setTodos([]);
  }, [todos]);

  return (
    <todoContext.Provider
      value={{
        todos,
        changeTodo,
        createTodo,
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
