// src/pages/NewPropertyPage.tsx
import { useNavigate } from 'react-router-dom';
import { PropertyForm, PropertyFormData } from '../components/properties/PropertyForm/PropertyForm';

export default function NewPropertyPage() {
  const navigate = useNavigate();

  const handleCreate = (data: PropertyFormData) => {
    console.log('CRIANDO PROPRIEDADE:', data);
    // Lógica de salvar na API...
    navigate('/properties');
  };

  return <PropertyForm onSubmit={handleCreate} />;
}