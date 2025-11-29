// src/router.tsx
import { createBrowserRouter, Outlet } from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Páginas de Autenticação
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';

// Páginas do App (dentro do RootLayout)
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
import Landing from './pages/landing-page/Landing';

export const router = createBrowserRouter([
  /* --- ROTA PADRÃO (Pública) --- */
  {
    path: '/',
    element: <Landing />, // Agora a Landing é a página inicial
  },

  /* --- ROTAS DE AUTENTICAÇÃO (Públicas) --- */
  /* --- ROTAS DE AUTENTICAÇÃO --- */
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

  /* --- ROTAS DO APP (Protegidas) --- */
  /* --- ROTAS DO APP --- */
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />, // /app
      },
      {
        path: 'diary',
        element: <DiaryLayout />,
        children: [
          { index: true, element: <DiaryPage /> },      // /app/diary
          { path: 'new', element: <NewActivity /> },    // /app/diary/new
          { path: 'edit/:id', element: <EditActivity /> },
        index: true, 
        element: <HomePage />,
      },
      {
        path: 'diary',
        element: <DiaryLayout />, 
        children: [
          { index: true, element: <DiaryPage /> },      
          { path: 'new', element: <NewActivity /> },  
          { path: 'edit/:id', element: <EditActivity /> }, 
        ],
      },

      {
        path: 'properties',
        element: <PropertiesLayout />,
        children: [
          { index: true, element: <PropertiesPage /> }, // /app/properties
          { path: 'new', element: <NewProperty /> },
          { path: 'edit/:id', element: <EditProperty /> },
        element: <PropertiesLayout />, 
        children: [
          { index: true, element: <PropertiesPage /> },    
          { path: 'new', element: <NewProperty /> }, 
          { path: 'edit/:id', element: <EditProperty /> }, 
        ],
      },

      { path: 'cultures', element: <CulturesPage /> }, // /app/cultures
      { path: 'products', element: <ProductsPage /> }, // /app/products
    ],
  },
]);
