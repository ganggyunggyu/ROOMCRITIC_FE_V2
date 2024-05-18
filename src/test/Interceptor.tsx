import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { getCookie } from '../shared/lib/cookie';
import { axiosConfig } from './axios-config';
import useLogout from '../shared/hooks/auth/useLogout';
import { setAccessToken } from '../app/store/slice/tokenSlice';
import { setIsLoggedIn, setUserInfo } from '../app/store/slice/userSlice';

const Interceptor = ({ children }) => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.token);
  const { userInfo } = useAppSelector((state) => state.user);
  const { mutate: logout } = useLogout();

  console.log('Interceptor mounted');
  console.log('accessToken:', accessToken);
  console.log('userInfo:', userInfo);

  const fetchLoginStatus = async () => {
    try {
      const result = await axiosConfig.get('/user/login-check');
      return result.data;
    } catch (error) {
      console.error(error);
    }
  };
  const refreshAccessToken = async (refreshToken: string) => {
    try {
      console.log('Refreshing access token...');
      if (!refreshToken) {
        throw new Error('Missing userId or refreshToken');
      }

      const response = await axiosConfig.post(`/user/auth/access-token`, { refreshToken });

      const accessToken = response.data.accessToken;
      dispatch(setAccessToken(accessToken));
      console.log('Access token refreshed successfully');
      return accessToken;
    } catch (error) {
      console.error('Failed to refresh token:', error.message);
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
        console.log(error);
      },
    );

    const responseInterceptor = axiosConfig.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (!userInfo) {
            console.log('userInfo is null or undefined');
            return Promise.reject(error);
          }

          const { userId } = userInfo;
          try {
            console.log('Attempting to refresh access token');
            const refreshToken = getCookie('refreshToken');
            const newAccessToken = await refreshAccessToken(refreshToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            console.log('Access token refreshed successfully');
            const fetchInfo = await fetchLoginStatus();
            console.log('Fetch login status:', fetchInfo);

            return axiosConfig(originalRequest);
          } catch (refreshError) {
            console.log('Failed to refresh access token');
            logout(userId);
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
    try {
      console.log('Attempting to refresh access token');
      const refreshToken = getCookie('refreshToken');
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        dispatch(setAccessToken(newAccessToken));
        console.log('Access token refreshed successfully');
        const fetchInfo = await fetchLoginStatus();
        console.log('Fetch login status:', fetchInfo);
        dispatch(setUserInfo(fetchInfo));
        dispatch(setIsLoggedIn(fetchInfo.isLoggedIn));
      }
    } catch (refreshError) {
      console.log('Failed to refresh access token');
      // logout(userId);
    }
  };
  React.useEffect(() => {
    init();
  }, []);
  return children;
};

export { Interceptor };
