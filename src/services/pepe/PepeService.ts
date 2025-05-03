import { api } from 'src/config/axios';
import type { PepeProps, PepeResponseProps } from 'src/models/api/PepeServiceTypes';

export const getPepe = async ({ test }: PepeProps): Promise<PepeResponseProps[]> => {
  const environment = import.meta.env.VITE_ENVIRONMENT;

  if (environment === 'DEV') {
    const response = await fetch(`/mock/pepe?test=${test}`);
    const data = await response.json();
    return data;
  }
  
  const response = await api.get(`/pepe?test=${test}`);
  const data = response.data;
  return data;
};