import axios from 'axios';
import { HOST } from '../env-config';

const axiosConfig = axios.create({
  baseURL: HOST,
  headers: {
    Authorization: 'Bearer your-token',
  },
  withCredentials: true,
});

export default axiosConfig;
