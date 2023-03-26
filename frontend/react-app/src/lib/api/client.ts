import applyCaseMiddleware from 'axios-case-converter';
import axios, { type AxiosInstance } from 'axios';

const options = {
  ignoreHeaders: true,
};

const client: AxiosInstance = applyCaseMiddleware(
  axios.create({
    baseURL:
      process.env.REACT_APP_NODE_ENV === 'development'
        ? 'http://localhost/api/v1'
        : 'https://api.ymnk.fun/api/v1',
  }),
  options
);

export default client;
