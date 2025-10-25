// src/layouts/RootLayout.tsx
import { Outlet } from 'react-router-dom';
// (Opcional) Importe seus componentes de layout
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

export default function RootLayout() {
  return (
    <div className="app-container">
      {/* <Navbar /> */}
      <main>
        {/* O Outlet renderiza a rota filha correspondente */}
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}