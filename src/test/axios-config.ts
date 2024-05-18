import axios from 'axios';
import { HOST } from '../config/env-config';

export const axiosConfig = axios.create({
  baseURL: HOST,
});
