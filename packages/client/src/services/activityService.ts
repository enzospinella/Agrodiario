// src/services/activityService.ts
import { apiClient } from '../config/api.client';

// Tipo simplificado baseado no seu form de Atividades
export interface ActivityDTO {
  id?: number;
  date: string;
  propriedade: string;
  tipo: string;
  descricao: string;
  responsavel: string;
  files?: File[]; // Array de arquivos reais do input
  removedFiles?: string[];
}

// Função auxiliar para converter Objeto JS -> FormData
const createFormData = (data: ActivityDTO) => {
  const formData = new FormData();

  // Adiciona campos de texto
  formData.append('date', data.date);
  formData.append('propriedade', data.propriedade);
  formData.append('tipo', data.tipo);
  formData.append('descricao', data.descricao);
  formData.append('responsavel', data.responsavel);

  if (data.files && data.files.length > 0) {
    data.files.forEach((file) => {
      formData.append('files', file); 
    });
  }

  if (data.removedFiles && data.removedFiles.length > 0) {
    formData.append('removedFiles', JSON.stringify(data.removedFiles));
  }

  return formData;
};

export const activityService = {
  getAll: async () => {
    const response = await apiClient.get('/activities');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/activities/${id}`);
    return response.data;
  },

  create: async (data: ActivityDTO) => {
    const formData = createFormData(data);
    
    const response = await apiClient.post('/activities', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data;
  },

  update: async (id: string, data: ActivityDTO) => {
    const formData = createFormData(data);
    
    const response = await apiClient.patch(`/activities/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/activities/${id}`);
  },
};