// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';

// Pages
// import HomePage from './pages/Home';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
// import ProfilePage from './pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, 
    
    children: [
    //   {
    //     index: true, 
    //     element: <HomePage />,
    //   },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    //   {
    //     path: 'profile',
    //     element: <ProfilePage />, 
    //   },
    ],
  },
  // {
  //   path: '/admin',
  //   element: <AdminLayout />,
  //   children: [...]
  // }
]);