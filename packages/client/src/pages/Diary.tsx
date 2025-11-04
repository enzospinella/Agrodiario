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
  FiPlus,
  FiDownload,
} from 'react-icons/fi';
import { MdArrowDropDown } from 'react-icons/md';
import { Link } from 'react-router-dom';

// Dados de exemplo
const mockData = [
  {
    id: 1,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
  },
  {
    id: 2,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
  },
  {
    id: 3,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
  },
  {
    id: 4,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
  },
  {
    id: 5,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
  },
  {
    id: 6,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
  },
  {
    id: 7,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
  },
  {
    id: 8,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
  },
  {
    id: 9,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
  },
];

export default function DiaryPage() {

  const handleSortNewest = () => {
    console.log('Ordenando por mais recentes');
  };

  const handleSortOldest = () => {
    console.log('Ordenando por mais antigas');
  };

  return (
    <div className={styles.diaryPage}>
      {/* 2. Barra de Ferramentas (Busca e Filtro) */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Input
            label="Busque por alguma anotação"
            name="search"
            icon={<FiSearch size={18} />}
            style={{ borderRadius: '64px', padding: '1.2rem 1.5rem', width: '95%' }}
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
            date={item.date || ''}
            title={item.title || ''}
            preparo={item.preparo || ''}
            aplicacao={item.aplicacao || ''}
            responsavel={item.responsavel || ''}
          />
        ))}
      </div>

      {/* 4. Rodapé (Carregar mais) */}
      <footer className={styles.footer}>
        <Button variant="quaternary" style={{ width: '15%', borderRadius: '32px', border: '1px solid rgba(0, 0, 0, 0.5)' }}>Carregar mais</Button>
      </footer>
    </div>
  );
}