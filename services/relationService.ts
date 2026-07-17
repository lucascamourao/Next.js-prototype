import { CreateRelationDto, Relation } from '@/types/relation';
import { api } from './api';

export const relationService = {
  async create(data: CreateRelationDto): Promise<Relation> {
    console.log('Enviando para API:', data);

    const response = await api.post('/relations', data);

    return response.data;
  },

  async getAll(): Promise<Relation[]> {
    const response = await api.get('/relations');

    return response.data;
  },
};
