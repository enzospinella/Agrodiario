// src/pages/Diary.tsx
import { FaRegCalendarPlus } from 'react-icons/fa';
import { Button } from '../components/common/Button/Button';
import { Input } from '../components/common/Input/Input';
import { Dropdown } from '../components/common/Dropdown/Dropdown';
import { ActivityCard } from '../components/diary/ActivityCard/ActivityCard';
import styles from './Diary.module.css';

import {
  FiSearch,
  FiDownload,
} from 'react-icons/fi';
import { MdArrowDropDown } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Drawer } from '@/components/common/Drawer/Drawer';
import { ActivityDetailsDrawer } from '@/components/diary/ActivityDetailsDrawer/ActivityDetailsDrawer';
import { activityService } from '@/services/activityService';

import { generateActivityReport } from '@/utils/generatePDF';

export type Activity = {
  id: string;
  date: string;
  titulo: string;
  preparo: string;
  aplicacao: string;
  responsavel: string;
  propriedade: string;
  insumoNome?: string;
  insumoQuantidade?: string;
  insumoUnidade?: string;
  tipo: 'preparo' | 'aplicacao' | 'colheita' | 'manejo';
  descricao: string;
  anexos: [];
};

const ITEMS_PER_PAGE = 6;

export default function DiaryPage() {
  
  const [activities, setActivities] = useState<any[]>([]); 
  const [total, setTotal] = useState(0);
  
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleGenerateReport = async () => {
    try {
      setIsGeneratingReport(true);
      
      const response = await activityService.getAll(1, 1000, sortOrder, searchTerm);
      
      const textoFiltro = searchTerm ? `Busca por: "${searchTerm}"` : 'Todos os registros';
      
      generateActivityReport(response.data, textoFiltro);

    } catch (error) {
      console.error('Erro ao gerar relatório', error);
      alert('Erro ao gerar o relatório. Tente novamente.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleViewActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedActivity(null), 300); 
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadActivities(nextPage, sortOrder, searchTerm);
  };
  
  const loadActivities = async (
    pageToLoad: number, 
    orderToLoad: 'ASC' | 'DESC', 
    searchToLoad: string
  ) => {
    try {
      if (pageToLoad === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await activityService.getAll(pageToLoad, ITEMS_PER_PAGE, orderToLoad, searchToLoad);

      if (pageToLoad === 1) {
        setActivities(response.data);
      } else {
        setActivities((prev) => [...prev, ...response.data]);
      }
      setTotal(response.total);
    } catch (error) {
      console.error("Erro ao carregar", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1); 
      loadActivities(1, sortOrder, searchTerm);
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleDelete = async () => {
    if (!selectedActivity) return;
    await activityService.delete(selectedActivity.id);
    await loadActivities(1, sortOrder, searchTerm); 
    handleCloseDrawer();
  }

  const handleSortChange = (newOrder: 'ASC' | 'DESC') => {
    if (newOrder === sortOrder) return;

    setSortOrder(newOrder);
    setPage(1);
    setActivities([]);
    
    loadActivities(1, newOrder, searchTerm);
  };

  useEffect(() => {
    loadActivities(1, sortOrder, searchTerm);
  }, []);

  const hasMore = activities.length < total;

  return (
    <div className={styles.diaryPage}>
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Input
            label="Busque por alguma anotação"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                className={styles.dropdownItem}
                onClick={() => handleSortChange('DESC')}
                style={{ fontWeight: sortOrder === 'DESC' ? 'bold' : 'normal' }}
              >
                Mais recentes
              </button>
              <button 
                className={styles.dropdownItem}
                onClick={() => handleSortChange('ASC')}
                style={{ fontWeight: sortOrder === 'ASC' ? 'bold' : 'normal' }}
              >
                Mais antigas
              </button>
            </div>
          </Dropdown>

          <div></div>
          
          <Button 
            variant="secondary" 
            leftIcon={<FiDownload size={18} />} 
            style={{ borderRadius: '32px' }}
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
          >
            {isGeneratingReport ? 'Gerando...' : 'Gerar relatório'}
          </Button>
        </div>
      </div>

      <div className={styles.grid}>
        {loading && page === 1 ? (
           <p>Carregando atividades...</p>
        ) : (
           activities.map((item) => (
             <ActivityCard 
                key={item.id} 
                activity={item} 
                onView={() => handleViewActivity(item)} 
             />
           ))
        )}
      </div>

      <footer className={styles.footer}>
        {hasMore && (
          <Button 
            variant="quaternary" 
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
        
        {/* Opcional: Mensagem quando acaba */}
        {!hasMore && activities.length > 0 && (
          <span style={{ color: '#999', fontSize: '0.9rem' }}>
            Você chegou ao fim da lista.
          </span>
        )}
      </footer>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="Visualizar atividade"
      >
        {selectedActivity && (
          <ActivityDetailsDrawer
            activity={{
              ...selectedActivity,
            }}
            onDelete={handleDelete}
          />
        )}
      </Drawer>
    </div>
  );
}