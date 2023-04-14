import { type AxiosResponse } from 'axios';
import { type UpdateUserData, type Follow } from 'interfaces';
import client, { auth } from './client';

export const getUsers = async (): Promise<AxiosResponse<any>> => {
  return await client.get('users', auth);
};

export const getUser = async (id: number): Promise<AxiosResponse<any>> => {
  return await client.get(`users/${id}`, auth);
};

export const updateUser = async (
  id: number | undefined | null,
  data: UpdateUserData
): Promise<AxiosResponse<any>> => {
  return await client.put(`users/${id ?? 'undefined'}`, data, auth);
};

export const addFollowUser = async (
  userId: number
): Promise<AxiosResponse<Follow>> => {
  return await client.post(`/users/${userId}/follows`, null, auth);
};

export const removeFollowUser = async (
  userId: number
): Promise<AxiosResponse<void>> => {
  return await client.delete(`/users/${userId}/follows`, auth);
};

export const getMessages = async (
  userId: number
): Promise<AxiosResponse<any>> => {
  return await client.get(`/users/${userId}/messages`, auth);
};

export const createMessage = async (
  userId: number,
  data: FormData
): Promise<AxiosResponse<any>> => {
  return await client.post(`/users/${userId}/messages`, data, auth);
};
