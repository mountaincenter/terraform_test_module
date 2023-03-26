import client from './client';
import Cookies from 'js-cookie';

import { type SignUpData, type SignInData } from 'interfaces';

export const signUp = async (data: SignUpData): Promise<any> => {
  return await client.post('auth', data);
};

export const signIn = async (data: SignInData): Promise<any> => {
  return await client.post('auth/sign_in', data);
};

export const signOut = async (): Promise<any> => {
  const accessToken = Cookies.get('_access-token');
  const clientInstance = Cookies.get('_client');
  const uid = Cookies.get('_uid');

  if (accessToken != null && clientInstance != null && uid != null) {
    return await client.delete('auth/sign_out', {
      headers: {
        'access-token': accessToken,
        client: clientInstance,
        uid,
      },
    });
  } else {
    throw new Error('Missing required cookies');
  }
};

export const getCurrentUser = async (): Promise<any> => {
  const accessToken = Cookies.get('_access-token');
  const clientInstance = Cookies.get('_client');
  const uid = Cookies.get('_uid');

  if (accessToken != null && clientInstance != null && uid != null) {
    return await client.get('/auth/sessions', {
      headers: {
        'access-token': accessToken,
        client: clientInstance,
        uid,
      },
    });
  } else {
    throw new Error('Missing required cookies');
  }
};
