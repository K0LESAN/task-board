import Container from './components/container';
import TaskBoard from './components/task-board';
import DnDProvider from './providers/dnd-provider';

const App = () => {
  return (
    <DnDProvider>
      <Container>
        <TaskBoard />
      </Container>
    </DnDProvider>
  );
};

export default App;
