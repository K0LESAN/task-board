import DnDProvider from './providers/dnd-provider';
import TodoProvider from './providers/todo-provider';
import TaskBoard from './components/task-board';

const App = () => {
  return (
    <DnDProvider>
      <TodoProvider>
        <TaskBoard />
      </TodoProvider>
    </DnDProvider>
  );
};

export default App;
