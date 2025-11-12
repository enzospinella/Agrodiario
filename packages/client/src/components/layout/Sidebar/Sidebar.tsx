// src/components/layout/Sidebar/Sidebar.tsx
import { useNavigate, NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import logo from '../../../assets/logo.png'; // Verifique se o caminho do logo está correto

// Importando ícones do React-Icons (pacote Feather)
import {
  FiHome,
  FiLogOut,
} from 'react-icons/fi';
import { TbBuildingWarehouse, TbNotebook, TbPlant2 } from 'react-icons/tb';
import { LuFileBadge } from 'react-icons/lu';

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Adicionar sua lógica de logout (limpar token, etc.)
    console.log('Usuário deslogado');
    navigate('/login'); // Redireciona para o login
  };

  return (
    <aside className={styles.sidebar}>
      {/* Seção Superior: Logo e Navegação */}
      <div>
        <div className={styles.sidebarTop}>
            <img src={logo} alt="AgroDiário Logo" className={styles.logo} />
        </div>
    

        <nav className={styles.nav}>
          <NavLink
            to="/"
            end // 'end' garante que só fique ativo no 'Início'
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            <FiHome size={20} />
            <span>Início</span>
          </NavLink>

          <NavLink
            to="/diary"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            <TbNotebook size={20} />
            <span>Diário de atividades</span>
          </NavLink>

          <NavLink
            to="/properties"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            <TbBuildingWarehouse size={20} />
            <span>Minhas propriedades</span>
          </NavLink>

          <NavLink
            to="/cultures"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            <TbPlant2 size={20} />
            <span>Minhas culturas</span>
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
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
  );
}