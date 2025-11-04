// src/router.tsx
import { createBrowserRouter, Outlet } from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';

// Páginas de Autenticação
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';

// Páginas do App (dentro do RootLayout)
import HomePage from './pages/Home';
import DiaryPage from './pages/Diary';
import PropertiesPage from './pages/Properties';
import CulturesPage from './pages/Cultures';
import ProductsPage from './pages/Products';
import NewActivityPage from './pages/NewActivity';
import DiaryLayout from './layouts/DiaryLayout';

export const router = createBrowserRouter([
  /* --- ROTAS DE AUTENTICAÇÃO (Sem Sidebar) --- */
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

  /* --- ROTAS DO APP (Com Sidebar) --- */
  {
    path: '/',
    element: <RootLayout />, // O Layout com a Sidebar
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true, // Rota 'Início'
        element: <HomePage />,
      },
      {
        path: 'diary',
        element: <DiaryLayout />, // 2. USAR O NOVO LAYOUT AQUI
        children: [
          {
            index: true, // /diary
            element: <DiaryPage />,
          },
          {
            path: 'new', // /diary/new
            element: <NewActivityPage />,
          },
        ],
      },
      {
        path: 'properties',
        element: <PropertiesPage />,
      },
      {
        path: 'cultures',
        element: <CulturesPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
    ],
  },
]);