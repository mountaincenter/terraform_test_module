import { AxiosResponse } from 'axios';
import { Follow } from 'interfaces';
import client, { auth } from './client';

export const followUser = async (
  userId: number
): Promise<AxiosResponse<Follow>> => {
  return await client.post(`/users/${userId}/follows`, null, auth);
};

export const unfollowUser = async (
  userId: number
): Promise<AxiosResponse<void>> => {
  return await client.delete(`/users/${userId}/follows`, auth);
};
