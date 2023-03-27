import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';
import Cookies from 'js-cookie';

const options = {
  ignoreHeaders: true,
};

export const auth = {
  headers: {
    'access-token': Cookies.get('_access_token') ?? '',
    client: Cookies.get('_client') ?? '',
    uid: Cookies.get('_uid') ?? '',
  },
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL:
      process.env.REACT_APP_NODE_ENV === 'development'
        ? 'http://localhost/api/v1/'
        : 'https://api.ymnk.fun/api/v1/',
  }),
  options
);

export default client;
