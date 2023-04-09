import { type AxiosResponse } from 'axios';
import client, { auth } from './client';
interface PostLikeResponse { isLiked: boolean }

export const getPosts = async (): Promise<AxiosResponse> => {
  return await client.get('/posts', auth);
};

export const createPost = async (data: FormData): Promise<AxiosResponse> => {
  return await client.post('/posts', data, auth);
};

export const deletePost = async (id: number): Promise<void> => {
  await client.delete(`/posts/${id}`, auth);
};

export const addPostLike = async (postId: number): Promise<PostLikeResponse> => {
  return await client.post(`/posts/${postId}/likes`, null, auth);
};

export const removePostLike = async (postId: number): Promise<PostLikeResponse> => {
  return await client.delete(`/posts/${postId}/likes`, auth);
};
