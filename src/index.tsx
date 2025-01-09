import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './app';
import './i18n';
import './styles/index.scss';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
