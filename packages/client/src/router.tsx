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
import NewActivityPage from './pages/ActivityForm';
import DiaryLayout from './layouts/DiaryLayout';
import NewActivity from './pages/NewActivity';
import EditActivity from './pages/EditActivity';
import PropertiesLayout from './layouts/PropertiesLayout';
import NewProperty from './pages/NewProperty';
import EditProperty from './pages/EditProperty';

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
        element: <DiaryLayout />, // O pai <Outlet> renderiza os filhos
        children: [
          { index: true, element: <DiaryPage /> },      // /diary
          { path: 'new', element: <NewActivity /> },  // /diary/new
          { path: 'edit/:id', element: <EditActivity /> }, // /diary/edit/1
        ],
      },
      {
        path: 'properties',
        element: <PropertiesLayout />, // O novo layout de seção
        children: [
          { index: true, element: <PropertiesPage /> },    // /properties
          { path: 'new', element: <NewProperty /> },  // /properties/new
          { path: 'edit/:id', element: <EditProperty /> }, // /properties/edit/1
        ],
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