import { type AxiosResponse } from 'axios';
import client from './client';
type PostLikeResponse = { isLiked: boolean };

export const getPosts = async (): Promise<AxiosResponse> => {
  return await client.get('/posts');
};

export const createPost = async (data: FormData): Promise<AxiosResponse> => {
  return await client.post('/posts', data);
};

export const deletePost = async (id: number): Promise<void> => {
  await client.delete(`/posts/${id}`);
};

export const addPostLike = async (
  postId: number
): Promise<PostLikeResponse> => {
  return await client.post(`/posts/${postId}/likes`);
};

export const removePostLike = async (
  postId: number
): Promise<PostLikeResponse> => {
  return await client.delete(`/posts/${postId}/likes`);
};
