import { api } from './api';
import { CreateLocationDto, Location } from '@/types/location';

export const locationService = {
  async create(data: CreateLocationDto): Promise<Location> {
    console.log('Enviando para API:', data);

    const response = await api.post('/locations', data);

    console.log('Resposta da API:', response.data);

    return response.data;
  },

  async getAll(): Promise<Location[]> {
    const response = await api.get('/locations');

    return response.data;
  },
};
