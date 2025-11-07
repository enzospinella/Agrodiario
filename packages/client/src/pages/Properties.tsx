// src/pages/Properties.tsx
import { Button } from '../components/common/Button/Button';
import { Input } from '../components/common/Input/Input';
import { Dropdown } from '../components/common/Dropdown/Dropdown';
import { PropertyCard } from '../components/properties/PropertyCard'; // Importa o novo card
import styles from './Properties.module.css'; // Vamos criar este CSS
import { FiSearch, FiDownload } from 'react-icons/fi';
import { FaRegCalendarPlus } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import { Drawer } from '@/components/common/Drawer/Drawer';
import { useState } from 'react';
import { Property } from '@/components/properties/PropertyDetailsDrawer/PropertyDetailsDrawer';
import { PropertyDetailsDrawer } from '@/components/properties/PropertyDetailsDrawer/PropertyDetailsDrawer';

// Dados de exemplo
const mockProperties = [
  {
    id: 1,
    name: 'Sítio Oliveira',
    location: 'Florínea (SP)',
    talhoes: [{ id: 1, name: 'Talhão 1', cultura: 'Aoba', area: 30, status: 'plantado' as 'plantado' }, {id: 5, name: 'Talhão 2', cultura: 'Aoba', area: 15, status: 'em preparo' as 'em preparo'}], // Replace with appropriate Talhao structure
    cultivo: 'Soja',
    area: 45,
    address: 'Rua Principal, 123',
    areaTotal: 50,
    areaCultivada: 45,
    cultivoPrincipal: 'Soja',
  },
  {
    id: 2,
    name: 'Sítio Oliveira',
    location: 'Florínea (SP)',
    talhoes: [{ id: 2, name: 'Talhão 1', cultura: 'Aoba', area: 30, status: 'plantado' as 'plantado' }, { id: 5, name: 'Talhão 2', cultura: 'Aoba', area: 15, status: 'em preparo' as 'em preparo'}],
    cultivo: 'Soja',
    area: 45,
    address: 'Rua Principal, 123',
    areaTotal: 50,
    areaCultivada: 45,
    cultivoPrincipal: 'Soja',
  },
  {
    id: 3,
    name: 'Sítio Oliveira',
    location: 'Florínea (SP)',
    talhoes: [{ id: 3, name: 'Talhão 1', cultura: 'Aoba', area: 30, status: 'plantado' as 'plantado' }, { id: 5, name: 'Talhão 2', cultura: 'Aoba', area: 15, status: 'em preparo' as 'em preparo'}],
    cultivo: 'Soja',
    area: 45,
    address: 'Rua Principal, 123',
    areaTotal: 50,
    areaCultivada: 45,
    cultivoPrincipal: 'Soja',
  },
  {
    id: 4,
    name: 'Sítio Oliveira',
    location: 'Florínea (SP)',
    talhoes: [{ id: 4, name: 'Talhão 1', cultura: 'Aoba', area: 30, status: 'plantado' as 'plantado' }, { id: 5, name: 'Talhão 2', cultura: 'Aoba', area: 15, status: 'em preparo' as 'em preparo' }],
    cultivo: 'Soja',
    area: 45,
    address: 'Rua Principal, 123',
    areaTotal: 50,
    areaCultivada: 45,
    cultivoPrincipal: 'Soja',
  },
  {
    id: 5,
    name: 'Sítio Oliveira',
    location: 'Florínea (SP)',
    talhoes: [{ id: 5, name: 'Talhão 1', cultura: 'Aoba', area: 30, status: 'plantado' as 'plantado' }, {id: 5, name: 'Talhão 2', cultura: 'Aoba', area: 15, status: 'em preparo' as 'em preparo'}],
    cultivo: 'Soja',
    area: 45,
    address: 'Rua Principal, 123',
    areaTotal: 50,
    areaCultivada: 45,
    cultivoPrincipal: 'Soja',
  },
];

export default function PropertiesPage() {
    const handleSortNewest = () => {
        console.log('Ordenando por mais recentes');
      };
    
      const handleSortOldest = () => {
        console.log('Ordenando por mais antigas');
      };

      const [isDrawerOpen, setIsDrawerOpen] = useState(false);
      const [selectedProperty, setselectedProperty] = useState<Property | null>(
        null
      );
    
      const handleViewProperty = (property: Property) => {
        setselectedProperty(property);
        setIsDrawerOpen(true);
      };
    
      const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        // É uma boa prática limpar o estado ao fechar
        setTimeout(() => setselectedProperty(null), 300); // Atraso pela animação
      };

      const handleEdit = () => {
        console.log('Editar:', selectedProperty?.id);
        // Aqui você pode navegar para a página de edição
        // navigate(`edit/${selectedActivity?.id}`)
      };
    
      const handleDelete = () => {
        console.log('Excluir:', selectedProperty?.id);
        // Adicione a lógica de exclusão
        handleCloseDrawer(); // Fecha o drawer após excluir
      };

  return (
    <>
      {/* Barra de Ferramentas (Toolbar) */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Input
            label="Busque por nome da propriedade"
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

      {/* Grid de Cards */}
      <div className={styles.grid}>
        {mockProperties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} 
          onView={() => handleViewProperty(prop)}/>
        ))}
      </div>

      {/* (Opcional) Rodapé (Carregar mais) */}
      <footer className={styles.footer}>
        <Button variant="quaternary">Carregar mais</Button>
      </footer>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="Visualizar atividade"
      >
        {/* Só renderiza o conteúdo se uma atividade estiver selecionada */}
        {selectedProperty && (
          <PropertyDetailsDrawer property={selectedProperty} onDelete={handleDelete} />
        )}
      </Drawer>
    </>
  );
}