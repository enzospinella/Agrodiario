// src/pages/NewActivity.tsx
import ActivityForm from './ActivityForm';
import { useNavigate } from 'react-router-dom';

export default function NewActivity() {
  const navigate = useNavigate();

  const handleCreate = (data: any) => {
    console.log('CRIANDO NOVA ATIVIDADE:', data);
    // Lógica para salvar...
    navigate('/diary'); // Volta para a lista
  };

  // Renderiza o formulário em modo "Novo" (sem initialData)
  return <ActivityForm onSubmit={handleCreate} />;
}