// src/components/diary/ActivityDetailsDrawer/ActivityDetailsDrawer.tsx
import styles from './ActivityDetailsDrawer.module.css';
import { Button } from '../../common/Button/Button';
import { TagToggle } from '../../common/TagToggle/TagToggle';
import { FiTrash2, FiEdit2, FiEye } from 'react-icons/fi';
import { RiHome8Line } from 'react-icons/ri';
import { ReactNode, useState } from 'react';
import { MdOutlineDateRange } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '@/components/common/ConfirmationModal/ConfirmationModal';
import { InfoBlock } from '@/components/common/InfoBlock/InfoBlock';

// Define o que o componente de detalhes espera
// (Vamos assumir que o 'activity' tem todos esses dados)
type Activity = {
  id: string;
  date: string;
  propriedade: string;
  tipo: 'preparo' | 'aplicacao' | 'colheita' | 'manejo';
  descricao: string;
  anexos: { name: string }[];
};

type Props = {
  activity: Activity;
  onEdit: () => void;
  onDelete: () => void;
};


export function ActivityDetailsDrawer({ activity, onEdit, onDelete }: Props) {
  const navigate = useNavigate();
  
  // Mapeia o tipo para a cor da tag
  const getTagColor = (type: string) => {
    switch (type) {
      case 'preparo': return 'red';
      case 'aplicacao': return 'blue';
      case 'colheita': return 'green';
      case 'manejo': return 'orange';
      default: return 'red';
    }
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    // Removemos o 'onClose' e navegamos
    navigate(`/diary/edit/${activity.id}`);
  };

  const handleConfirmDelete = () => {
    onDelete(); // Chama a função original (da DiaryPage)
    setIsDeleteModalOpen(false); // Fecha o modal
  };

  return (
    // Wrapper que divide o conteúdo do rodapé
    <div className={styles.container}>
      {/* 1. Conteúdo Principal (com scroll) */}
      <div className={styles.mainContent}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Detalhes da atividade</h3>
          <InfoBlock label="Data da atividade" value={activity.date} icon={<MdOutlineDateRange size={18} />}/>
          <InfoBlock
            label="Propriedade associada"
            value={activity.propriedade}
            icon={<RiHome8Line size={18} />}
          />
          
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Tipo de atividade</span>
            <TagToggle
              color={getTagColor(activity.tipo)}
              isActive={true}
              // Impede que o usuário clique na tag no modo de visualização
              style={{ cursor: 'default' }} 
            >
              {/* Capitaliza a primeira letra: "preparo" -> "Preparo" */}
              {activity.tipo.charAt(0).toUpperCase() + activity.tipo.slice(1)}
            </TagToggle>
          </div>
          <InfoBlock label="Descrição" value={activity.descricao} />
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Anexos</h3>
          {activity.anexos.map((anexo, index) => (
            <div key={index} className={styles.anexoItem}>
              <span>{anexo.name}</span>
              <FiEye size={18} />
            </div>
          ))}
        </section>
      </div>

      {/* 2. Rodapé Fixo */}
      <footer className={styles.footer}>
        <Button variant="tertiary" leftIcon={<FiTrash2 />} onClick={() => setIsDeleteModalOpen(true)}>
          Excluir
        </Button>
        <Button variant="primary" leftIcon={<FiEdit2 />} onClick={handleEditClick}>
          Editar
        </Button>
      </footer>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Excluir atividade"
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      >
        Tem certeza que deseja excluir esta atividade?
      </ConfirmationModal>
    </div>
  );
}