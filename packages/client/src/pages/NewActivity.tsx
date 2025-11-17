// src/pages/NewActivity.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Ajuste o import conforme onde seu ActivityForm está salvo (ex: ../components/diary/...)
import {ActivityForm, ActivityFormData} from './ActivityForm'; 
import { activityService } from '../services/activityService';

export default function NewActivity() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (data: ActivityFormData, files: File[]) => {
    console.log('Criando atividade com dados:', data, 'e arquivos:', files);
    try {
      setIsLoading(true);

      // Chama o serviço passando os dados do formulário + o array de arquivos
      await activityService.create({
        ...data,
        files: files, // O service vai converter isso para FormData
      });

      alert('Atividade criada com sucesso!');
      navigate('/diary'); // Redireciona para a listagem
    } catch (error) {
      console.error('Erro ao criar atividade:', error);
      alert('Ocorreu um erro ao criar a atividade. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ActivityForm 
      onSubmit={handleCreate} 
      isLoading={isLoading} 
    />
  );
}