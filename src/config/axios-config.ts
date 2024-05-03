import axios from 'axios';
import { HOST } from './env-config';
const AxiosConfig = axios.create({
  // baseURL: 'https://api.room-critic.online',
  // baseURL: 'http://localhost:4000',
  baseURL: HOST,

  headers: {
    Authorization: 'Bearer your-token',
  },
  withCredentials: true,
});

AxiosConfig.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업을 여기에 추가할 수 있습니다.

    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  },
);

AxiosConfig.interceptors.response.use(
  (response) => {
    // 응답 데이터를 처리하기 전에 여기에 수행할 작업을 추가할 수 있습니다.
    return response;
  },
  (error) => {
    // 응답 오류 처리
    return Promise.reject(error);
  },
);

export default AxiosConfig;
