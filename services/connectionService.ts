import { api } from './api';
import { CreateConnectionDto, Connection } from '@/types/connection';

export const connectionService = {
  async create(data: CreateConnectionDto): Promise<Connection> {
    const response = await api.post('/connections', data);

    return response.data;
  },

  async getAll(): Promise<Connection[]> {
    const response = await api.get('/connections');

    return response.data;
  },
};
