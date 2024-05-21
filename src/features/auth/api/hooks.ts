import { useMutation } from '@tanstack/react-query';
import { submitJoin, submitLogin } from './api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store';
import { setIsLoggedIn, setUserInfo } from '../../../app/store/slice/userSlice';

export const useAuth = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const join = useMutation({
    mutationKey: ['join'],
    mutationFn: submitJoin,
  });

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: submitLogin,
    onSuccess: (result) => {
      const userInfo = result.data.userInfo;
      const isLoggedIn = result.data.isLoggedIn;
      dispatch(setIsLoggedIn(isLoggedIn));
      dispatch(setUserInfo(userInfo));
      navigator('/');
      console.log(result);
    },
    onError: (error) => {
      throw error;
    },
    onSettled: (error) => {
      console.error(error);
    },
  });

  return { join, login };
};
