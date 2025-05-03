import { api } from 'src/config/axios';
import type { HomeProps, HomeResponseProps } from 'src/models/api/HomeServiceTypes';

export const getHome = async ({ test }: HomeProps): Promise<HomeResponseProps[]> => {
  const environment = import.meta.env.VITE_ENVIRONMENT;

  if (environment === 'DEV') {
    const response = await fetch(`/mock/home?test=${test}`);
    const data = await response.json();
    return data;
  }
  
  const response = await api.get(`/home?test=${test}`);
  const data = response.data;
  return data;
};