import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from './interceptors';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export const getAxios = async (url: string) => {
  const res = await api.get(url);
  return res;
};

export const postAxios = async (url: string, option: any) => {
  const res = await api.post(url, option);
  return res;
};

export const putAxios = async (url: string, option: any) => {
  const res = await api.put(url, option);
  return res;
};

export const deleteAxios = async (url: string) => {
  const res = await api.delete(url);
  return res;
};
