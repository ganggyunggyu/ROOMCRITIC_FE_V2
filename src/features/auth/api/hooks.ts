import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/store';
import { setClearAuth, setIsLoggedIn, setUserInfo } from '../../../shared/store/slice/userSlice';
import { setAccessToken, setRefreshTokenExp } from '../../../shared/store/slice/tokenSlice';
import { clearCookie, setCookie } from '../../../shared/lib/cookie';

import * as A from './api';

export const useJoin = () => {
  return useMutation({
    mutationKey: ['join'],
    mutationFn: A.submitJoin,
  });
};

export const useLogin = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { prevPathName } = useAppSelector((state) => state.prevPathName);

  return useMutation({
    mutationKey: ['login'],
    mutationFn: A.submitLogin,

    onSuccess: (result) => {
      const userInfo = result.data.userInfo;
      const isLoggedIn = result.data.isLoggedIn;
      const accessToken = result.data.accessToken;
      const refreshToken = result.data.refreshToken.refreshToken;
      const refreshTokenExp = result.data.refreshToken.refreshTokenExp;

      console.log(result);
      dispatch(setIsLoggedIn(isLoggedIn));
      dispatch(setUserInfo(userInfo));
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshTokenExp(refreshTokenExp));
      setCookie('refreshToken', refreshToken);

      navigator(prevPathName);
    },
    onError: (error) => {
      throw error;
    },
    onSettled: (error) => {
      throw error;
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: A.submitLogout,
    onSuccess: () => {
      navigate('/');
      dispatch(() => setClearAuth());
      clearCookie('refreshToken');

      window.location.reload();
    },
  });
};
