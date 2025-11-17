// src/pages/Diary.tsx
import { FaRegCalendarPlus } from 'react-icons/fa';
import { Button } from '../components/common/Button/Button';
import { Input } from '../components/common/Input/Input';
import { Dropdown } from '../components/common/Dropdown/Dropdown';
import { ActivityCard } from '../components/diary/ActivityCard/ActivityCard';
import styles from './Diary.module.css';

// Ícones
import {
  FiSearch,
  FiDownload,
} from 'react-icons/fi';
import { MdArrowDropDown } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Drawer } from '@/components/common/Drawer/Drawer';
import { ActivityDetailsDrawer } from '@/components/diary/ActivityDetailsDrawer/ActivityDetailsDrawer';
import { activityService } from '@/services/activityService';

export type Activity = {
  id: string;
  date: string;
  title: string;
  preparo: string;
  aplicacao: string;
  responsavel: string;
  // Campos adicionais para os detalhes
  propriedade: string;
  tipo: 'preparo' | 'aplicacao' | 'colheita' | 'manejo';
  descricao: string;
  anexos: [];
};


export default function DiaryPage() {

  const [activities, setActivities] = useState<any[]>([]); // Use o tipo correto
  const [loading, setLoading] = useState(true);

  const handleSortNewest = () => {
    console.log('Ordenando por mais recentes');
  };

  const handleSortOldest = () => {
    console.log('Ordenando por mais antigas');
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const handleViewActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    // É uma boa prática limpar o estado ao fechar
    setTimeout(() => setSelectedActivity(null), 300); // Atraso pela animação
  };

  const handleEdit = () => {
    console.log('Editar:', selectedActivity?.id);
    // Aqui você pode navegar para a página de edição
    // navigate(`edit/${selectedActivity?.id}`)
  };
  
  const loadActivities = async () => {
    try {
      const data = await activityService.getAll();
      setActivities(data);
    } catch (error) {
      console.error("Erro ao carregar", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedActivity) return;
    await activityService.delete(selectedActivity.id);
    await loadActivities(); // Recarrega a lista após deletar
    handleCloseDrawer();
 }

  useEffect(() => {
    console.log("Carregando atividades...");
    loadActivities();
  }, []);

  return (
    <div className={styles.diaryPage}>
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Input
            label="Busque por alguma anotação"
            name="search"
            icon={<FiSearch size={18} />}
            style={{ borderRadius: '128px', padding: '0.6rem 1rem', width: '95%' }}
          />
        </div>
        <div className={styles.toolbarButtons} >
          <Dropdown
            trigger={
              <Button variant="tertiary" leftIcon={<FaRegCalendarPlus size={18} />} rightIcon={<MdArrowDropDown size={18} />} style={{ borderRadius: '16px', width: 'max-content' }} >
                Ordenar por
              </Button>
            }
          >
            <div className={styles.dropdownMenu}>
              <button
                onClick={handleSortNewest}
                className={styles.dropdownItem}
              >
                Mais recentes
              </button>
              <button
                onClick={handleSortOldest}
                className={styles.dropdownItem}
              >
                Mais antigas
              </button>
            </div>
          </Dropdown>
          <div></div>
          <Button variant="secondary" leftIcon={<FiDownload size={18} />} style={{ borderRadius: '32px' }} >
            Gerar relatório
          </Button>
        </div>
      </div>

      {/* 3. Grid de Cards */}
      <div className={styles.grid}>
        {activities.map((item) => (
          <ActivityCard
          key={item.id}
          // 7. Passar a atividade inteira e a função de 'view'
          activity={item}
          onView={() => handleViewActivity(item)}
        />
        ))}
      </div>

      {/* 4. Rodapé (Carregar mais) */}
      <footer className={styles.footer}>
        <Button variant="quaternary" style={{ width: '15%', borderRadius: '32px', border: '1px solid rgba(0, 0, 0, 0.5)' }}>Carregar mais</Button>
      </footer>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="Visualizar atividade"
      >
        {/* Só renderiza o conteúdo se uma atividade estiver selecionada */}
        {selectedActivity && (
          <ActivityDetailsDrawer
            activity={{
              ...selectedActivity,
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Drawer>
    </div>
  );
}