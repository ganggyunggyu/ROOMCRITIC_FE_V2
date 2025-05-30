import axios, { AxiosInstance } from 'axios';
import { HOST } from '../env-config';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: HOST,
  // withCredentials: true,
});
