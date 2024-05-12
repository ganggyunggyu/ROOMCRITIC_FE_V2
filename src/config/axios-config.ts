import axios from 'axios';
import { clearCookie, getCookie, setCookie } from '../shared/lib/cookie';
import { HOST } from './env-config';

export const refreshAccessToken = async (userId: string, refreshToken: string) => {
  try {
    // 토큰 갱신 로직 구현
    const response = await axios.post(
      `${HOST}/user/auth/access-token`,
      {
        userId,
        refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie('refreshToken')}`,
        },
      },
    );

    const accessToken = response.data.accessToken;
    clearCookie('accessToken');
    setCookie('accessToken', accessToken);
    return response;
  } catch (error) {
    throw new Error('토큰 갱신에 실패했습니다.');
  }
};

const axiosConfig = axios.create({
  baseURL: HOST,
});

axiosConfig.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosConfig.interceptors.response.use(
  async (response) => {
    // 응답 데이터를 처리하기 전에 여기에 수행할 작업을 추가할 수 있습니다.

    return response;
  },
  async (error) => {
    // const { userInfo } = useAppSelector((state) => state.user);
    // const { _id } = userInfo;
    const refreshToken = getCookie('refreshToken');

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const accessToken = await refreshAccessToken('6629e63db60f7e47ff09ccab', refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosConfig(originalRequest);
      } catch (error) {
        console.error('토큰 갱신에 실패했습니다.');

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosConfig;
