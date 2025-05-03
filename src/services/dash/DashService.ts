import { api } from 'src/config/axios';
import type { DashProps, DashResponseProps } from 'src/models/api/DashServiceTypes';

export const getDash = async ({ test }: DashProps): Promise<DashResponseProps[]> => {
  const environment = import.meta.env.VITE_ENVIRONMENT;

  if (environment === 'DEV') {
    const response = await fetch(`/mock/dash?test=${test}`);
    const data = await response.json();
    return data;
  }
  
  const response = await api.get(`/dash?test=${test}`);
  const data = response.data;
  return data;
};