// src/components/diary/ActivityDetailsDrawer/ActivityDetailsDrawer.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ActivityDetailsDrawer.module.css';
import { Button } from '../../common/Button/Button';
import { TagToggle } from '../../common/TagToggle/TagToggle';
import { ConfirmationModal } from '../../common/ConfirmationModal/ConfirmationModal';
import { FiTrash2, FiEdit2, FiEye } from 'react-icons/fi';
import { UPLOADS_URL } from '../../../config/api.client'; // Importe a URL base

// Atualize o tipo para bater com o retorno da API
type Activity = {
  id: string;
  date: string;
  propriedade: string;
  tipo: string; // string vindo do back
  descricao: string;
  responsavel: string;
  insumoNome?: string;
  insumoQuantidade?: string;
  insumoUnidade?: string;
  anexos?: string[]; // Agora é um array de strings (nomes dos arquivos)
};

type Props = {
  activity: Activity;
  onEdit?: () => void; // Opcional pois lidamos com navegação interna ou prop
  onDelete: () => void;
};

// Componente auxiliar
const InfoBlock = ({ label, value }: { label: string; value: string | undefined }) => (
  <div className={styles.infoBlock}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{value || '-'}</span>
  </div>
);

export function ActivityDetailsDrawer({ activity, onDelete }: Props) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Função auxiliar para cores das tags
  const getTagColor = (type: string) => {
    const normalizedType = type.toLowerCase();
    if (normalizedType.includes('preparo')) return 'red';
    if (normalizedType.includes('aplicacao') || normalizedType.includes('aplicação')) return 'blue';
    if (normalizedType.includes('colheita')) return 'green';
    if (normalizedType.includes('manejo')) return 'orange';
    return 'red';
  };

  const handleEditClick = () => {
    navigate(`/diary/edit/${activity.id}`);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsDeleteModalOpen(false);
  };

  // Função para abrir o anexo
  const handleViewAnexo = (fileName: string) => {
    window.open(`${UPLOADS_URL}/${fileName}`, '_blank');
  };

  return (
    <div className={styles.container}>
      {/* Conteúdo Principal */}
      <div className={styles.mainContent}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Detalhes da atividade</h3>
          <InfoBlock label="Data da atividade" value={new Date(activity.date).toLocaleDateString('pt-BR')} />
          <InfoBlock label="Propriedade associada" value={activity.propriedade} />
          
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Tipo de atividade</span>
            <div style={{ marginTop: '4px' }}>
              <TagToggle
                color={getTagColor(activity.tipo)}
                isActive={true}
                style={{ cursor: 'default' }}
              >
                {activity.tipo}
              </TagToggle>
            </div>
          </div>
          
          <InfoBlock label="Descrição" value={activity.descricao} />
          <InfoBlock label="Responsável" value={activity.responsavel} />
        </section>

        {/* Seção de Insumos (Condicional) */}
        {activity.insumoNome && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Insumos Utilizados</h3>
            <InfoBlock label="Produto" value={activity.insumoNome} />
            <InfoBlock 
              label="Quantidade" 
              value={`${activity.insumoQuantidade || ''} ${activity.insumoUnidade || ''}`} 
            />
          </section>
        )}

        {/* Seção de Anexos */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Anexos</h3>
          
          {(!activity.anexos || activity.anexos.length === 0) && (
            <p style={{ color: '#667085', fontSize: '0.9rem' }}>Nenhum anexo.</p>
          )}

          {activity.anexos?.map((fileName, index) => (
            console.log('Anexo:', activity.anexos), (
            <div key={index} className={styles.anexoItem}>
              <span className={styles.fileName} title={fileName}>
                {fileName}
              </span>
              <button 
                onClick={() => handleViewAnexo(fileName)} 
                className={styles.viewButton}
                title="Visualizar"
              >
                <FiEye size={18} />
              </button>
            </div>
          )))}
        </section>
      </div>

      {/* Rodapé */}
      <footer className={styles.footer}>
        <Button variant="tertiary" leftIcon={<FiTrash2 />} onClick={() => setIsDeleteModalOpen(true)}>
          Excluir
        </Button>
        <Button variant="primary" leftIcon={<FiEdit2 />} onClick={handleEditClick}>
          Editar
        </Button>
      </footer>

      {/* Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir atividade"
      >
        Tem certeza que deseja excluir esta atividade?
      </ConfirmationModal>
    </div>
  );
}