import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState, userInfoState } from '../../../app/store/atoms';
import * as API from '../../api/API';

const useLogin = () => {
  const navigator = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  return useMutation({
    mutationKey: ['login'],
    mutationFn: API.submitLogin,

    onSuccess: (result) => {
      console.log(result);
      const userInfo = result.data.userInfo._doc;
      const isLoggedIn = result.data.isLoggedIn;
      setUserInfo(userInfo);
      setIsLoggedIn(isLoggedIn);
      navigator('/');
    },
    onError: (error) => {
      throw error;
    },
  });
};
export default useLogin;
