import { api } from 'src/config/axios';
import type { KjhiuProps, KjhiuResponseProps } from 'src/models/api/KjhiuServiceTypes';

export const getKjhiu = async ({ test }: KjhiuProps): Promise<KjhiuResponseProps[]> => {
  const environment = import.meta.env.VITE_ENVIRONMENT;

  if (environment === 'DEV') {
    const response = await fetch(`/mock/kjhiu?test=${test}`);
    const data = await response.json();
    return data;
  }
  
  const response = await api.get(`/kjhiu?test=${test}`);
  const data = response.data;
  return data;
};