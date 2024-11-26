import React from 'react';

import { clearCookie, getCookie } from '../../shared/lib/cookie';
import { setAccessToken } from '../store/slice/tokenSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { setIsLoggedIn, setUserInfo } from '../store/slice/userSlice';
import { fetchLoginStatus, useLogout } from '@/entities';
import { axiosConfig } from '@/config/axios-config';

const Interceptor = ({ children }) => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.token);
  const refreshToken = getCookie('refreshToken');

  const { userInfo } = useAppSelector((state) => state.user);
  const { mutate: logout } = useLogout();

  console.debug('current status');
  console.debug('accessToken:', accessToken);
  console.debug('userInfo:', userInfo);

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      console.debug('401 응답 에러 오류 발생 리프레시 토큰 재발급 시작');
      if (!refreshToken) {
        throw new Error('리프레시 토큰 없음');
      }

      const response = await axiosConfig.post(`/user/auth/access-token`, { refreshToken });

      const accessToken = response.data.accessToken;
      dispatch(setAccessToken(accessToken));
      console.debug('엑세스 토큰 재발급 성공');
      return accessToken;
    } catch (error) {
      console.error('accessToken 재발급 실패', error);
      const err = error.response.data;
      if (err) {
        // if (err.code === 410) {
        //   await reissueRefreshToken(refreshToken);
        // }
        throw new Error(err.code + err.message);
      }

      throw new Error('Failed to refresh token');
    }
  };

  React.useEffect(() => {
    const requestInterceptor = axiosConfig.interceptors.request.use(
      async (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        console.debug(error);
      },
    );

    const responseInterceptor = axiosConfig.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            console.debug('Attempting to refresh access token');
            const newAccessToken = await refreshAccessToken(refreshToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            console.debug('Access token refreshed successfully');
            const fetchInfo = await fetchLoginStatus();
            console.debug('Fetch login status:', fetchInfo);

            return axiosConfig(originalRequest);
          } catch (refreshError) {
            console.debug('Failed to refresh access token');
            clearCookie('refreshToken');

            logout(refreshToken);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosConfig.interceptors.request.eject(requestInterceptor);
      axiosConfig.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, userInfo, dispatch, logout]);

  const init = async () => {
    if (refreshToken) {
      const fetchInfo = await fetchLoginStatus();
      console.debug('새로 패치 된 유저 정보:', fetchInfo);
      dispatch(setUserInfo(fetchInfo));
      dispatch(setIsLoggedIn(fetchInfo.isLoggedIn));
    }
  };
  React.useEffect(() => {
    init();
  }, []);
  return children;
};

export { Interceptor };
