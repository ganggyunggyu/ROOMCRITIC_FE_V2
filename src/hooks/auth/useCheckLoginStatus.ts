import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState, userInfoState } from '../../store/atoms';
import useLoginStatus from './useLoginStatus';

const useCheckLoginStatus = () => {
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const { data, error, isSuccess } = useLoginStatus();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      if (data.status === 200) {
        const { isLoggedIn, userInfo } = data.data;
        setIsLoggedIn(isLoggedIn);
        setUserInfo(userInfo.user);
        console.log(userInfo.user);
      }
      if (data.status === 201) {
        setIsLoggedIn(false);
        setUserInfo({ _id: '', displayName: '' });
      }
    }
    if (error) {
      console.error(error);
      setIsLoggedIn(false);
      setUserInfo({ _id: '', displayName: '' });
    }
  }, [isSuccess, error, data, setIsLoggedIn, setUserInfo]);

  return { data, error, isSuccess };
};

export default useCheckLoginStatus;
