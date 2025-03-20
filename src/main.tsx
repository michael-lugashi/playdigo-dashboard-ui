import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { StrictMode } from 'react';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
