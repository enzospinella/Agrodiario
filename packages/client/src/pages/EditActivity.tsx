// src/pages/EditActivity.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Ajuste o import conforme sua estrutura
import { ActivityForm, ActivityFormData } from './ActivityForm'; 
import { activityService } from '../services/activityService';

export default function EditActivity() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL (ex: /diary/edit/1)

  const [activityToEdit, setActivityToEdit] = useState<Partial<ActivityFormData> | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true); // Loading inicial (GET)
  const [isSaving, setIsSaving] = useState(false);          // Loading de salvamento (PATCH)

  // 1. Buscar os dados da atividade ao carregar a página
  useEffect(() => {
    async function loadActivity() {
      if (!id) return;

      try {
        setIsLoadingData(true);
        const data = await activityService.getById(id);
        
        // O backend pode retornar campos extras (id, createdAt), 
        // mas o ActivityForm só se importa com os campos definidos em ActivityData.
        setActivityToEdit(data); 
      } catch (error) {
        console.error('Erro ao carregar atividade:', error);
        alert('Não foi possível carregar os dados da atividade.');
        navigate('/diary'); // Volta se der erro
      } finally {
        setIsLoadingData(false);
      }
    }

    loadActivity();
  }, [id, navigate]);

  // 2. Função para salvar as alterações
  const handleEdit = async (data: ActivityFormData, files: File[]) => {
    if (!id) return;

    try {
      setIsSaving(true);

      await activityService.update(id, data), {
        ...data,
        files: files, // Envia novos arquivos (se houver)
      };

      alert('Atividade atualizada com sucesso!');
      navigate('/diary');
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
      alert('Ocorreu um erro ao salvar as alterações.');
    } finally {
      setIsSaving(false);
    }
  };

  // Renderização condicional
  if (isLoadingData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <p>Carregando dados da atividade...</p>
      </div>
    );
  }

  if (!activityToEdit) {
    return <div>Atividade não encontrada.</div>;
  }

  return (
    <ActivityForm 
      initialData={activityToEdit} 
      onSubmit={handleEdit} 
      isLoading={isSaving} 
    />
  );
}