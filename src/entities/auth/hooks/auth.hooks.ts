import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setClearAuth, setIsLoggedIn, setUserInfo } from '../../../app/store/slice/userSlice';
import { setAccessToken, setRefreshTokenExp } from '../../../app/store/slice/tokenSlice';
import { clearCookie, setCookie } from '../../../shared/lib/cookie';
import { submitJoin, submitLogin, submitLogout } from '../api';

export const useJoin = () => {
  return useMutation({
    mutationKey: ['join'],
    mutationFn: submitJoin,
  });
};

export const useLogin = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { prevPathName } = useAppSelector((state) => state.prevPathName);

  return useMutation({
    mutationKey: ['login'],
    mutationFn: submitLogin,

    onSuccess: (result) => {
      const userInfo = result.data.userInfo;
      const isLoggedIn = result.data.isLoggedIn;
      const accessToken = result.data.accessToken;
      const refreshToken = result.data.refreshToken.refreshToken;
      const refreshTokenExp = result.data.refreshToken.refreshTokenExp;

      dispatch(setIsLoggedIn(isLoggedIn));
      dispatch(setUserInfo(userInfo));
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshTokenExp(refreshTokenExp));
      setCookie('refreshToken', refreshToken);
      if (prevPathName !== 'join') {
        navigator(prevPathName);
      } else {
        navigator('/');
      }
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
    mutationFn: submitLogout,
    onSuccess: () => {
      navigate('/');
      dispatch(() => setClearAuth());
      clearCookie('refreshToken');

      window.location.reload();
    },
  });
};
