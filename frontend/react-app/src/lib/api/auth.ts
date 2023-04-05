import client, { auth } from './client';
import Cookies from 'js-cookie';

import { type SignUpData, type SignInData } from 'interfaces';

// サインアップ（アカウント新規作成）
export const signUp = async (data: SignUpData): Promise<any> => {
  return await client.post('auth', data);
};

// サインイン（ログイン）
export const signIn = async (data: SignInData): Promise<any> => {
  return await client.post('auth/sign_in', data);
};

// サインアウト（ログアウト）
export const signOut = async (): Promise<any> => {
  return await client.delete('auth/sign_out', auth);
};

// 認証済みのユーザーを取得（currentUser）
export const getCurrentUser = async (): Promise<any> => {
  if (
    Cookies.get('_access_token') === '' ||
    Cookies.get('_client') === '' ||
    Cookies.get('_uid') === ''
  )
    return;
  return await client.get('auth/sessions', auth);
};

// ゲストユーザーでサインイン
export const guestSignIn = async (): Promise<any> => {
  return await client.post('auth/sessions/guest_sign_in');
};
