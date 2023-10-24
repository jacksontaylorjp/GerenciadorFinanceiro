import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes';
import { StatusModalProvider } from 'context/StatusModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* passando o contexto para toda a aplicação */}
    <StatusModalProvider>
      <App />
    </StatusModalProvider>
  </React.StrictMode>
);

