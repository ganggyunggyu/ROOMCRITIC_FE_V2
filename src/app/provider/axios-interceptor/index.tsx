import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import { setAccessToken } from '../../store/slice/tokenSlice';
import { setIsLoggedIn, setUserInfo } from '../../store/slice/userSlice';
import { clearCookie, getCookie } from '@/shared/lib/cookie';
import { fetchLoginStatus, useLogout } from '@/entities';
import { axios } from '@/app/config';

export const AuthProvider = ({ children }) => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.token);
  const refreshToken = getCookie('refreshToken');

  const { userInfo } = useAppSelector((state) => state.user);
  const { mutate: logout } = useLogout();

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      if (!refreshToken) {
        throw new Error('리프레시 토큰 없음');
      }

      const response = await axios.post(`/user/auth/access-token`, {
        refreshToken,
      });

      const accessToken = response.data.accessToken;
      dispatch(setAccessToken(accessToken));

      return accessToken;
    } catch (error) {
      console.error('accessToken 재발급 실패', error);
      const err = error.response.data;
      if (err) {
        throw new Error(err.code + err.message);
      }

      throw new Error('Failed to refresh token');
    }
  };

  React.useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        console.error(error);
      },
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const newAccessToken = await refreshAccessToken(refreshToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            const fetchInfo = await fetchLoginStatus();

            return axios.request(originalRequest);
          } catch (refreshError) {
            clearCookie('refreshToken');

            logout(refreshToken);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, userInfo, dispatch, logout]);

  const refreshLoginCheck = async () => {
    if (refreshToken) {
      const fetchInfo = await fetchLoginStatus();

      dispatch(setUserInfo(fetchInfo));
      dispatch(setIsLoggedIn(fetchInfo.isLoggedIn));
    }
  };
  React.useEffect(() => {
    refreshLoginCheck();
  }, []);
  return children;
};
