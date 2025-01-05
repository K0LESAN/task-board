import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import DnDProvider from './providers/dnd-provider';
import App from './app';
import './styles/index.scss';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <DnDProvider>
      <App />
    </DnDProvider>
  </StrictMode>
);
