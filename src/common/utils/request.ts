import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import config from '../../config';

const getRequestConfig = (): AxiosRequestConfig => ({
  headers: {
    Authorization: 'Bearer ' + Cookies.get('appToken') || '',
  },
});
const getFullURL = (path: string) => `${config.BASE_API}${path}`;

const request = {
  get: (path: string) =>
    axios.get(getFullURL(path), getRequestConfig()).then((res) => res.data),
  post: (path: string, body?: any) =>
    axios.post(getFullURL(path), body, getRequestConfig()).then((res) => res.data),
  patch: (path: string, body?: any) =>
    axios.patch(getFullURL(path), body, getRequestConfig()).then((res) => res.data),
  put: (path: string, body?: any) =>
    axios.put(getFullURL(path), body, getRequestConfig()).then((res) => res.data),
  del: (path: string) =>
    axios.delete(getFullURL(path), getRequestConfig()).then((res) => res.data),
};

export default request;
