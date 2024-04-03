import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../../api/AxiosConfig';
import { isLoggedInState, userInfoState } from '../../store/atoms';

type TRequestUserInfo = {
  email: string;
  password: string;
};

const useLogin = (requestUserInfo: TRequestUserInfo) => {
  const navigator = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [data, setData] = useState('');

  const submitLogin = async () => {
    try {
      const result = await axiosConfig.post('/auth/login', {
        email: requestUserInfo.email,
        password: requestUserInfo.password,
      });
      console.log(result);
      if (result.status === 200) {
        setUserInfo(result.data.userInfo._doc);
        setIsLoggedIn(result.data.isLoggedIn);
        navigator('/');
      }
      if (result.status === 201) {
        setData(result.data.message);
      }
    } catch (error) {
      console.log('로그인 요청 실패 : ');
    }
  };

  const fetchLogin = async () => {
    try {
      const result = await axiosConfig.get('/auth/login/check');
      console.log(result.data);
      if (result.status === 200) {
        setIsLoggedIn(true);
        setUserInfo(result.data.userInfo.user);
      }
      if (result.status === 201) {
        setIsLoggedIn(false);
        setUserInfo({ _id: '', displayName: '' });
      }
    } catch (error) {
      console.error('fetchLoginERROR !!', error);
    }
  };

  return { submitLogin, fetchLogin, data };
};
export default useLogin;
