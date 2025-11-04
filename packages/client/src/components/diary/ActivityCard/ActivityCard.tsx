// src/components/diary/ActivityCard/ActivityCard.tsx
import styles from './ActivityCard.module.css';
import { Button } from '../../common/Button/Button';
import {
  FiCalendar,
  FiTool, // Preparo
  FiDroplet, // Aplicação
  FiUser, // Responsável
} from 'react-icons/fi';
import { GiThreeLeaves } from 'react-icons/gi';

// Define o que o card espera receber
interface ActivityCardProps {
  date: string;
  title: string;
  preparo: string;
  aplicacao: string;
  responsavel: string;
}

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

export function ActivityCard({
  date,
  title,
  preparo,
  aplicacao,
  responsavel,
}: ActivityCardProps) {
  return (
    <div className={styles.card}>
      {/* Cabeçalho do Card */}
      <header className={styles.header}>
        <FiCalendar />
        <span>
          {date} – {title}
        </span>
      </header>

      {/* Conteúdo do Card */}
      <div className={styles.content}>
        <InfoItem icon={<GiThreeLeaves />} title="Preparo" text={preparo} />
        <InfoItem icon={<FiDroplet />} title="Aplicação" text={aplicacao} />
        <InfoItem icon={<FiUser />} title="Responsável" text={responsavel} />
      </div>

      {/* Rodapé do Card */}
      <footer className={styles.footer}>
        <Button variant="quaternary" style={{ width: '90%', backgroundColor: '#F1F5EC', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19)', borderRadius: '32px' }}>
          Visualizar
        </Button>
      </footer>
    </div>
  );
}