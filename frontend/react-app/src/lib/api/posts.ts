import { type AxiosPromise } from 'axios';
import client from './client';
import { type PostApiJson } from 'interfaces';

export const getPosts = async (): AxiosPromise<PostApiJson> => {
  return await client.get('/posts');
};

export const createPost = async (data: FormData): AxiosPromise => {
  return await client.post('/posts', data);
};

export const deletePost = async (id: string): AxiosPromise => {
  return await client.delete(`/posts/${id}`);
};
