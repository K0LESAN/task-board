import DnDProvider from './providers/dnd-provider';
import TodoProvider from './providers/todo-provider';
import Container from './components/container';
import TaskBoard from './components/task-board';

const App = () => {
  return (
    <DnDProvider>
      <TodoProvider>
        <Container>
          <TaskBoard />
        </Container>
      </TodoProvider>
    </DnDProvider>
  );
};

export default App;
