import { useState } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

type TRequestUserInfo = {
  email?: string;
  password?: string;
  displayName?: string;
  phoneNumber?: string;
};

type TJoinHook = {
  submitJoin: () => Promise<void>;
  data: string;
};

const useJoin = (requestUserInfo: TRequestUserInfo): TJoinHook => {
  const navigator = useNavigate();
  const [data, setData] = useState<string>('');
  const submitJoin = async () => {
    try {
      const result = await axiosConfig.post('/auth/join', {
        email: requestUserInfo.email,
        password: requestUserInfo.password,
        displayName: requestUserInfo.displayName,
        phoneNumber: requestUserInfo.phoneNumber,
      });

      if (result.data.message === '회원가입 성공') navigator('/login');
      setData(result.data.message);
    } catch (error) {
      console.log('가입요청실패 : ', error);
    }
  };

  return { submitJoin, data };
};
export default useJoin;
