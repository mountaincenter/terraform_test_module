import { type AxiosResponse } from 'axios';
import client, { auth } from './client';

export const getHealths = async (id: number): Promise<AxiosResponse<any>> => {
  return await client.get(`users/${id}/healths`, auth);
};

export const createHealths = async (
  id: number,
  data: FormData
): Promise<AxiosResponse<any>> => {
  return await client.post(`/users/${id}/healths`, data, auth);
};
