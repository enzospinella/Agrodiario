// src/layouts/DiaryLayout.tsx
import { Outlet, Link, useLocation } from 'react-router-dom'; // 1. Importe useLocation
import { Button } from '../components/common/Button/Button';
import styles from './DiaryLayout.module.css';
import { FiPlus, FiDownload } from 'react-icons/fi';

export default function DiaryLayout() {
  // 2. Obtenha a localização atual
  const location = useLocation();

  // 3. Verifique se estamos na página 'new'
  const isNewActivityPage = location.pathname === '/diary/new';

  return (
    <div className={styles.diaryLayout}>
      {/* 1. O CABEÇALHO COMPARTILHADO */}
      <header className={styles.header}>
        <h1 className={styles.title}>Diário de atividades</h1>
        <div className={styles.actions}>

          {/* 4. RENDERIZAÇÃO CONDICIONAL */}
          {/* Só mostre o botão se NÃO estiver na página new */}
          {!isNewActivityPage && (
            <Link to="new" className={styles.linkButton}>
              <FiPlus size={18} />
              <span>Nova atividade</span>
            </Link>
          )}
        </div>
      </header>

      {/* 2. ONDE O CONTEÚDO (LISTA OU FORM) VAI ENTRAR */}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}