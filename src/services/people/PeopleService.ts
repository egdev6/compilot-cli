import { api } from 'src/config/axios';
import type { PeopleProps, PeopleResponseProps } from 'src/models/api/PeopleServiceTypes';

export const getPeople = async ({ test }: PeopleProps): Promise<PeopleResponseProps[]> => {
  const response = await api.get(`/people?test=${test}`);
  const data = response.data;
  return data;
};