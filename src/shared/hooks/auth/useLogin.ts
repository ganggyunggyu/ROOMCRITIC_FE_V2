import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import * as API from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setIsLoggedIn, setUserInfo } from '../../../app/store/slice/userSlice';
import { setAccessToken, setRefreshTokenExp } from '../../../app/store/slice/tokenSlice';
import { setCookie } from '../../lib/cookie';

const useLogin = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { prevPathName } = useAppSelector((state) => state.prevPathName);

  return useMutation({
    mutationKey: ['login'],
    mutationFn: API.submitLogin,

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
export default useLogin;
