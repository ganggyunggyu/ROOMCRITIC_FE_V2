import { HOST } from '../../config/env-config';
import { clearCookie, getCookie, setCookie } from '../lib/cookie';
import { useAppSelector } from '../../app/store';
import axios from 'axios';

export const refreshAccessToken = async (userId: string, refreshToken: string) => {
  try {
    // 토큰 갱신 로직 구현
    const response = await axios.post(
      `http://localhost:4001/users/auth/access-token`,
      {
        userId,
        refreshToken,
      },
      {
        headers: {
          Authorization: getCookie('refreshToken'),
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
export const getAccessToken = () => {
  return getCookie('access_token');
};

const { accessToken } = getAccessToken();
// const accessToken = useSelector((accessTokenSlice) => accessTokenSlice);
const axiosConfig = axios.create({
  baseURL: HOST,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

axiosConfig.interceptors.request.use(
  async (config) => {
    console.log(config);
    const { accessToken } = getAccessToken();
    console.log(accessToken);
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

    // const result = await refreshAccessToken();
    // console.log(result);
    // const accessToken = result.data.accessToken;
    // clearCookie('access_token');
    // setCookie('access_token', accessToken);
    return response;
  },
  async (error) => {
    console.log('respons interceptors', error);
    const { userInfo } = useAppSelector((state) => state.user);
    const refreshToken = getCookie('refreshToken');
    const { _id } = userInfo;
    console.log(error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const accessToken = await refreshAccessToken(_id, refreshToken);
        console.log(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosConfig(originalRequest);
      } catch (error) {
        console.error('토큰 갱신에 실패했습니다.');
        // 갱신에 실패한 경우 로그인 페이지 등으로 리다이렉트 또는 다른 처리를 수행할 수 있습니다.
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosConfig;
