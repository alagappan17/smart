import axios from 'axios';

export const client = axios.create();

export type AxiosEnv = {
  api: {
    url: string;
  };
};

export const initialize = (environment: AxiosEnv) => {
  client.defaults.baseURL = environment.api.url;

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Axios ERROR', error);
      return Promise.reject(error);
    }
  );
};
