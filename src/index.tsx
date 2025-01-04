import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './app';
import './globals.scss';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
