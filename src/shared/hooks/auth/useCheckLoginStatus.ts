import React from 'react';
import useLoginStatus from './useLoginStatus';
import { useAppDispatch } from '../../../app/store';
import { setIsLoggedIn, setUserInfo } from '../../../app/store/slice/userSlice';

const useCheckLoginStatus = () => {
  const { data, error, isSuccess, refetch } = useLoginStatus();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (isSuccess) {
      if (data.status === 200) {
        const { isLoggedIn, userInfo } = data.data;
        dispatch(setIsLoggedIn(isLoggedIn));
        dispatch(setUserInfo(userInfo.user));
      }
      if (data.status === 201) {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    }
    if (error) {
      console.error(error);
      setIsLoggedIn(false);
      setUserInfo(null);
    }
  }, [isSuccess, error, data, setIsLoggedIn, setUserInfo]);

  return { data, error, refetch };
};

export default useCheckLoginStatus;
