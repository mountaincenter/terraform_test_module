import { type AxiosResponse } from 'axios';
import client from './client';
// import { type PostApiJson } from 'interfaces';

export const getPosts = async (): Promise<AxiosResponse> => {
  return await client.get('/posts');
};

export const createPost = async (data: FormData): Promise<AxiosResponse> => {
  return await client.post('/posts', data);
};

export const deletePost = async (id: string): Promise<void> => {
  await client.delete(`/posts/${id}`);
};
