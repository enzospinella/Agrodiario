// src/pages/EditPropertyPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { PropertyForm, PropertyFormData } from '../components/properties/PropertyForm/PropertyForm';

// Dados de exemplo para simular um banco de dados
const mockPropertiesDB: Record<string, Partial<PropertyFormData>> = {
  '1': {
    name: 'Sítio Oliveira',
    address: 'Estrada da Lavoura, Florínea, SP',
    areaTotal: '45',
    areaProducao: '40',
    cultivo: 'Soja',
    situacao: 'producao',
    // Coordenadas de exemplo para já vir com o pino no lugar certo
    markerPosition: [-22.86, -50.66],
    // Polígono de exemplo para já vir desenhado
    talhaoPolygon: [[-22.861, -50.661], [-22.863, -50.662], [-22.864, -50.660]]
  },
  '2': {
    name: 'Sítio Oliveira',
    address: 'Estrada da Lavoura, Florínea, SP',
    areaTotal: '45',
    areaProducao: '40',
    cultivo: 'Soja',
    situacao: 'producao',
    // Coordenadas de exemplo para já vir com o pino no lugar certo
    markerPosition: [-22.86, -50.66],
    // Polígono de exemplo para já vir desenhado
    talhaoPolygon: [[-22.861, -50.661], [-22.863, -50.662], [-22.864, -50.660]]
  },
  '3': {
    name: 'Sítio Oliveira',
    address: 'Estrada da Lavoura, Florínea, SP',
    areaTotal: '45',
    areaProducao: '40',
    cultivo: 'Soja',
    situacao: 'producao',
    // Coordenadas de exemplo para já vir com o pino no lugar certo
    markerPosition: [-22.86, -50.66],
    // Polígono de exemplo para já vir desenhado
    talhaoPolygon: [[-22.861, -50.661], [-22.863, -50.662], [-22.864, -50.660]]
  },
  '4': {
    name: 'Sítio Oliveira',
    address: 'Estrada da Lavoura, Florínea, SP',
    areaTotal: '45',
    areaProducao: '40',
    cultivo: 'Soja',
    situacao: 'producao',
    // Coordenadas de exemplo para já vir com o pino no lugar certo
    markerPosition: [-22.86, -50.66],
    // Polígono de exemplo para já vir desenhado
    talhaoPolygon: [[-22.861, -50.661], [-22.863, -50.662], [-22.864, -50.660]]
  },
  '5': {
    name: 'Sítio Oliveira',
    address: 'Estrada da Lavoura, Florínea, SP',
    areaTotal: '45',
    areaProducao: '40',
    cultivo: 'Soja',
    situacao: 'producao',
    // Coordenadas de exemplo para já vir com o pino no lugar certo
    markerPosition: [-22.86, -50.66],
    // Polígono de exemplo para já vir desenhado
    talhaoPolygon: [[-22.861, -50.661], [-22.863, -50.662], [-22.864, -50.660]]
  },
};

export default function EditPropertyPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Simula buscar os dados da propriedade pelo ID
  const propertyToEdit = id ? mockPropertiesDB[id] : null;

  const handleEdit = (data: PropertyFormData) => {
    console.log(`EDITANDO PROPRIEDADE ${id}:`, data);
    // Lógica de atualizar na API...
    navigate('/properties');
  };

  if (!propertyToEdit) {
    return <div>Propriedade não encontrada.</div>;
  }

  return (
    <PropertyForm 
      initialData={propertyToEdit} 
      onSubmit={handleEdit} 
    />
  );
}