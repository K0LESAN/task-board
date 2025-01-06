import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react';
import {
  type DragEndEvent,
  type UniqueIdentifier,
  useDndMonitor,
} from '@dnd-kit/core';
import type { Todo, TodoContext } from '@/shared/types';
import { TodoType } from '@/shared/constants';

export const todoContext = createContext<TodoContext>({
  todos: [],
  changeTodo() {},
  createTodo() {},
  clearTodos() {},
  clearTodosByType() {},
  removeTodo() {},
});

const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>((): Todo[] => {
    const storageTodos: string | null = localStorage.getItem('todos');
    const parsedTodos: Todo[] = storageTodos ? JSON.parse(storageTodos) : [];

    if (parsedTodos.length) {
      return parsedTodos;
    } else {
      import('@/assets/tasks.json').then((importData) => {
        const newTodos: Todo[] = importData.default as Todo[];

        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(newTodos);
      });
    }

    return [];
  });
  const createTodo = useCallback(
    (newTodo: Omit<Todo, 'id' | 'type'>): void => {
      const maxId: number = todos.reduce(
        (accMaxId: number, { id }: Todo): number => {
          return accMaxId > id ? accMaxId : id;
        },
        0
      );

      setTodos((prev: Todo[]): Todo[] => {
        const newTodos = [
          ...prev,
          {
            id: maxId + 1,
            type: TodoType.todo,
            ...newTodo,
          },
        ];

        localStorage.setItem('todos', JSON.stringify(newTodos));

        return newTodos;
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
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(newTodos);
      }
    },
    [todos]
  );
  const changeTodo = useCallback(
    (newTodo: Todo): void => {
      const todosWithoutChangedTodo = todos.filter(
        ({ id: todoId }: Todo): boolean => {
          return todoId !== newTodo.id;
        }
      );

      if (todos.length !== todosWithoutChangedTodo.length) {
        const newTodos = [...todosWithoutChangedTodo, newTodo];

        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(newTodos);
      }
    },
    [todos]
  );
  const clearTodosByType = useCallback(
    (clearType: TodoType): void => {
      const newTodos = todos.filter(({ type }: Todo): boolean => {
        return clearType !== type;
      });

      localStorage.setItem('todos', JSON.stringify(newTodos));
      setTodos(newTodos);
    },
    [todos]
  );
  const clearTodos = useCallback((): void => {
    localStorage.setItem('todos', '[]');

    setTodos([]);
  }, [todos]);
  useDndMonitor({
    onDragEnd({ over, active }: DragEndEvent) {
      if (!over) {
        return;
      }

      const overId: UniqueIdentifier = over.id;
      const todo: Todo = active.data.current as Todo;
      const newTodos: Todo[] = todos.filter(({ id }: Todo) => {
        return id !== todo.id;
      });

      if (overId === 'remove') {
        setTodos(newTodos);
        return;
      }

      const type: TodoType = overId as TodoType;

      if (type === todo.type) {
        return;
      }

      newTodos.push({
        ...todo,
        type,
      });

      setTodos(newTodos);
    },
  });

  return (
    <todoContext.Provider
      value={{
        todos,
        changeTodo,
        createTodo,
        clearTodos,
        clearTodosByType,
        removeTodo,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};

export default TodoProvider;
