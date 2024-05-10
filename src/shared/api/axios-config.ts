import axios from 'axios';
import { HOST } from '../../config/env-config';
import { clearCookie, getCookie, setCookie } from '../lib/cookie';

export const refreshAccessToken = async () => {
  try {
    // 토큰 갱신 로직 구현
    const response = await axios.post(
      `http://localhost:4001/users/auth/access-token`,
      {
        email: 'user1@example.com',
      },
      {
        headers: {
          Authorization: getCookie('refresh_token'),
        },
      },
    );
    const accessToken = response.data.accessToken;
    clearCookie('access_token');
    setCookie('access_token', accessToken);
    return response;
  } catch (error) {
    throw new Error('토큰 갱신에 실패했습니다.');
  }
};
export const getAccessToken = () => {
  return getCookie('access_token');
};

const accessToken = getCookie('access_token');
const AxiosConfig = axios.create({
  baseURL: HOST,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${accessToken}`,
  },
  withCredentials: true,
});
AxiosConfig.interceptors.request.use(
  (config) => {
    // await refreshAccessToken();
    const accessToken = getCookie('access_token');
    console.log(accessToken);
    config.headers.Authorization = `${accessToken}`;

    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  },
);

AxiosConfig.interceptors.response.use(
  async (response) => {
    // 응답 데이터를 처리하기 전에 여기에 수행할 작업을 추가할 수 있습니다.

    // const result = await refreshAccessToken();
    // console.log(result);
    // const accessToken = result.data.accessToken;
    // clearCookie('access_token');
    // setCookie('access_token', accessToken);
    return response;
  },
  async (error) => {
    console.log(error);
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
