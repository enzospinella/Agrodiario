// src/components/diary/ActivityCard/ActivityCard.tsx
import styles from './ActivityCard.module.css';
import { Button } from '../../common/Button/Button';
import {
  FiCalendar,
  FiDroplet, // Aplicação
  FiUser, // Responsável
} from 'react-icons/fi';
import { GiThreeLeaves } from 'react-icons/gi';

// Define o que o card espera receber
type ActivityCardProps = {
  activity: {
    date: string;
    title: string;
    preparo: string;
    aplicacao: string;
    responsavel: string;
  };
  onView: () => void; // 2. Adicionar a prop 'onView'
};

// Componente auxiliar para os ícones
function InfoItem({ icon, title, text }: any) {
  return (
    <div className={styles.infoItem}>
      <span className={styles.infoIcon}>{icon}</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

  export function ActivityCard({ activity, onView }: ActivityCardProps) {
    const { date, title, preparo, aplicacao, responsavel } = activity;
  
    return (
      <div className={styles.card}>
        {/* (Header permanece o mesmo) */}
        <header className={styles.header}>
          <FiCalendar />
          <span>
            {date} – {title}
          </span>
        </header>
  
        {/* (Content permanece o mesmo) */}
        <div className={styles.content}>
          <InfoItem icon={<GiThreeLeaves />} title="Preparo" text={preparo} />
          <InfoItem icon={<FiDroplet />} title="Aplicação" text={aplicacao} />
          <InfoItem icon={<FiUser />} title="Responsável" text={responsavel} />
        </div>
  
        {/* 3. Atualizar o Rodapé */}
        <footer className={styles.footer}>
          <Button
            variant="quaternary"
            style={{ width: '100%' }}
            onClick={onView} // 4. Ligar o onClick
          >
            Visualizar
          </Button>
        </footer>
      </div>
    );
  }