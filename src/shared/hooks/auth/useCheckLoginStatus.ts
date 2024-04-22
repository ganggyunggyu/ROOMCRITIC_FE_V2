import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState, userInfoState } from '../../../app/store/atoms';
import useLoginStatus from './useLoginStatus';

const useCheckLoginStatus = () => {
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const { data, error, isSuccess, refetch } = useLoginStatus();

  useEffect(() => {
    if (isSuccess) {
      if (data.status === 200) {
        const { isLoggedIn, userInfo } = data.data;
        setIsLoggedIn(isLoggedIn);
        setUserInfo(userInfo.user);
      }
      if (data.status === 201) {
        setIsLoggedIn(false);
        setUserInfo({ _id: '', displayName: '', phoneNumber: '', email: '' });
      }
    }
    if (error) {
      console.error(error);
      setIsLoggedIn(false);
      setUserInfo({ _id: '', displayName: '', phoneNumber: '', email: '' });
    }
  }, [isSuccess, error, data, setIsLoggedIn, setUserInfo]);

  return { data, error, refetch };
};

export default useCheckLoginStatus;
