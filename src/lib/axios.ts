import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.defaults.headers.common['Content-Type'] =
  'application/json;charset=utf-8';

const token = localStorage.getItem('token');

if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const getAxios = async (url: string) => {
  const res = await axiosInstance.get(url);
  return res;
};

export const postAxios = async (url: string, option: any) => {
  const res = await axiosInstance.post(url, option);
  return res;
};

export const putAxios = async (url: string, option: any) => {
  const res = await axiosInstance.put(url, option);
  return res;
};

export const deleteAxios = async (url: string) => {
  const res = await axiosInstance.delete(url);
  return res;
};
