import { api } from 'src/config/axios';
import type { GetTestingProps, TestingResponseProps } from 'src/models/api/TestingServiceTypes';

export const getTesting = async ({ test }: GetTestingProps): Promise<TestingResponseProps[]> => {
  const response = await api.get('/Testing?test=${test}`);
  const response = await api.get('/Testing', { params: args });
  const data = response.data;
  return data;
};