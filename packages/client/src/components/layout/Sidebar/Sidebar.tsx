// src/components/layout/Sidebar/Sidebar.tsx
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Sidebar.module.css';
import logo from '../../../assets/logo.png';

// Importando ícones do React-Icons
import {
  FiHome,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { TbBuildingWarehouse, TbNotebook, TbPlant2 } from 'react-icons/tb';
import { LuFileBadge } from 'react-icons/lu';
import { useState } from 'react';

export function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Botão Hamburguer para Mobile */}
      <button 
        className={styles.mobileToggle}
        onClick={toggleMobileMenu}
        aria-label="Abrir menu"
      >
        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay para mobile */}
      {isMobileOpen && (
        <div 
          className={styles.overlay}
          onClick={toggleMobileMenu}
        />
      )}

      <aside className={`${styles.sidebar} ${isMobileOpen ? styles.mobileOpen : ''}`}>
        {/* Seção Superior: Logo e Navegação */}
        <div>
          <div className={styles.sidebarTop}>
            <img src={logo} alt="AgroDiário Logo" className={styles.logo} />
          </div>

          <nav className={styles.nav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={() => setIsMobileOpen(false)}
            >
              <FiHome size={20} />
              <span>Início</span>
            </NavLink>

            <NavLink
              to="/diary"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={() => setIsMobileOpen(false)}
            >
              <TbNotebook size={20} />
              <span>Diário de atividades</span>
            </NavLink>

            <NavLink
              to="/properties"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={() => setIsMobileOpen(false)}
            >
              <TbBuildingWarehouse size={20} />
              <span>Minhas propriedades</span>
            </NavLink>

            <NavLink
              to="/cultures"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={() => setIsMobileOpen(false)}
            >
              <TbPlant2 size={20} />
              <span>Minhas culturas</span>
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={() => setIsMobileOpen(false)}
            >
              <LuFileBadge size={20} />
              <span>Aplicações de produtos</span>
            </NavLink>
          </nav>
        </div>

        {/* Seção Inferior: Logout */}
        <div className={styles.sidebarBottom}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <FiLogOut size={20} />
            <span>Sair da conta</span>
          </button>
        </div>
      </aside>
    </>
  );
}