import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const API = axios.create({});

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV !== 'development') {
  API.defaults.baseURL = process.env.REACT_APP_PROXY;
}

const authInterceptor = (config: AxiosRequestConfig) => {
  let token = '';
  const userString = localStorage.getItem('user');

  if (userString) {
    try {
      const user = JSON.parse(userString);
      token = user.token;
    } catch (err) {
      console.log(err);
    }
  }

  config.headers!.authorization = token;

  return config;
};

const handleResponse = (response: AxiosResponse) => {
  return response.data;
};

const handleError = (error: any) => {
  return Promise.reject(error);
};

API.interceptors.request.use(authInterceptor);
API.interceptors.response.use(handleResponse, handleError);
