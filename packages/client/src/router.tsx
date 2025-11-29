// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Páginas de Autenticação
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';

// Páginas do App
import HomePage from './pages/Home';
import DiaryPage from './pages/Diary';
import PropertiesPage from './pages/Properties';
import CulturesPage from './pages/Cultures';
import ProductsPage from './pages/Products';
import DiaryLayout from './layouts/DiaryLayout';
import NewActivity from './pages/NewActivity';
import EditActivity from './pages/EditActivity';
import PropertiesLayout from './layouts/PropertiesLayout';
import NewProperty from './pages/NewProperty';
import EditProperty from './pages/EditProperty';
import CulturesLayout from './layouts/CulturesLayout';
import Landing from './pages/landing-page/Landing';

export const router = createBrowserRouter([
  /* --- ROTA PADRÃO (Pública) --- */
  {
    path: '/',
    element: <Landing />,
  },

  /* --- AUTENTICAÇÃO --- */
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

  /* --- ROTAS PROTEGIDAS DO APP --- */
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true, // /app
        element: <HomePage />,
      },

      /* Diario */
      {
        path: 'diary',
        element: <DiaryLayout />,
        children: [
          { index: true, element: <DiaryPage /> },       // /app/diary
          { path: 'new', element: <NewActivity /> },     // /app/diary/new
          { path: 'edit/:id', element: <EditActivity /> } // /app/diary/edit/123
        ],
      },

      /* Propriedades */
      {
        path: 'properties',
        element: <PropertiesLayout />,
        children: [
          { index: true, element: <PropertiesPage /> },  // /app/properties
          { path: 'new', element: <NewProperty /> },
          { path: 'edit/:id', element: <EditProperty /> }
        ],
      },

      /* Culturas */
      {
        path: 'cultures',
        element: <CulturesLayout />,
        children: [
          { index: true, element: <CulturesPage /> },  // /app/cultures
          // TODO: Add new and edit pages when ready
          // { path: 'new', element: <NewCulture /> },
          // { path: 'edit/:id', element: <EditCulture /> }
        ],
      },

      { path: 'products', element: <ProductsPage /> },
    ],
  },
]);
