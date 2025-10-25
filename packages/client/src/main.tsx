import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router'; // Importe seu router
// Importe seu CSS global, se tiver
import './styles/global.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Substitua <App /> por <RouterProvider /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);