import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import * as API from '../../api/API';
import { useAppDispatch } from '../../../app/store';
import { setIsLoggedIn, setUserInfo } from '../../../app/store/slice/userSlice';

const useLogin = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: API.submitLogin,

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
export default useLogin;
