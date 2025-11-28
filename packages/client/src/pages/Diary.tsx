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
import { useState } from 'react';
import { Drawer } from '@/components/common/Drawer/Drawer';
import { ActivityDetailsDrawer } from '@/components/diary/ActivityDetailsDrawer/ActivityDetailsDrawer';

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
  anexos: { name: string }[];
};

// Dados de exemplo
const mockData = [
  {
    id: '1',
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: '2',
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: '3',
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: '4',
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: '5',
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: '6',
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: '7',
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: '8',
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: '9',
    date: '02/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
];

export default function DiaryPage() {

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

  const handleDelete = () => {
    console.log('Excluir:', selectedActivity?.id);
    // Adicione a lógica de exclusão
    handleCloseDrawer(); // Fecha o drawer após excluir
  };

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
        {mockData.map((item) => (
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
        <Button variant="outlined">Carregar mais</Button>
      </footer>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="Visualizar atividade"
      >
        {/* Só renderiza o conteúdo se uma atividade estiver selecionada */}
        {selectedActivity && (
          <ActivityDetailsDrawer
            activity={selectedActivity}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Drawer>
    </div>
  );
}