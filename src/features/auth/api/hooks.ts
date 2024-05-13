import { useMutation } from '@tanstack/react-query';
import { join, login } from './api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setIsLoggedIn, setUserInfo } from '../../../app/store/slice/userSlice';

export const useJoin = () => {
  return useMutation({
    mutationKey: ['join'],
    mutationFn: join,
  });
};

export const useLogin = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,

    onSuccess: (result) => {
      const userInfo = result.data.userInfo._doc;
      const isLoggedIn = result.data.isLoggedIn;
      dispatch(setIsLoggedIn(isLoggedIn));
      dispatch(setUserInfo(userInfo));
      navigator('/');
    },
    onError: (error) => {
      throw error;
    },
    onSettled: (error) => {
      console.log(error);
    },
  });
};

export const useAuth = () => {
  const { userInfo: viewerInfo, isLoggedIn } = useAppSelector((state) => state.user);

  return { viewerInfo, isLoggedIn };
};

export default useLogin;
