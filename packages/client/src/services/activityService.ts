// src/services/activityService.ts
import { apiClient } from '../config/api.client';
import { PropertyFormData } from '../components/properties/PropertyForm/PropertyForm'; // Adapte para o tipo da Activity se for diferente

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

  // Adiciona Arquivos Novos (para upload)
  if (data.files && data.files.length > 0) {
    data.files.forEach((file) => {
      formData.append('files', file); // 'files' deve bater com o backend
    });
  }

  if (data.removedFiles && data.removedFiles.length > 0) {
    // Enviamos como JSON string para o backend fazer o parse
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
    // Importante: O browser define o Content-Type multipart/form-data automaticamente
    const response = await apiClient.post('/activities', formData);
    return response.data;
  },

  update: async (id: string, data: ActivityDTO) => {
    const formData = createFormData(data);
    const response = await apiClient.patch(`/activities/${id}`, formData);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/activities/${id}`);
  },
};