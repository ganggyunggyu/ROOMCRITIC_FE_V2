import axios from 'axios';
import { HOST } from '../../config/env-config';

const AxiosConfig = axios.create({
  baseURL: HOST,
  headers: {
    Authorization: 'Bearer your-token',
  },
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    // 토큰 갱신 로직 구현
    const response = await axios.get(`http://localhost:8080/users/auth/refresh-token`, {
      // refresh token 전달
      // refresh_token: 'your-refresh-token',
    });
    const newAccessToken = response.data.access_token;
    console.log(response);
    return newAccessToken;
  } catch (error) {
    throw new Error('토큰 갱신에 실패했습니다.');
  }
};

AxiosConfig.interceptors.request.use(
  async (config) => {
    await refreshAccessToken();
    console.log('config', config);
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
    console.log('response', response);
    return response;
  },
  async (error) => {
    // 응답 오류 처리
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const accessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        console.log(accessToken);
        return AxiosConfig(originalRequest);
      } catch (error) {
        console.error('토큰 갱신에 실패했습니다.');
        // 갱신에 실패한 경우 로그인 페이지 등으로 리다이렉트 또는 다른 처리를 수행할 수 있습니다.
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default AxiosConfig;
