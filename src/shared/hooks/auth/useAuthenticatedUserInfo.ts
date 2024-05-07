import { useAppSelector } from '../../../app/store';
import useCheckLoginStatus from './useCheckLoginStatus';

const useAuthenticatedUserInfo = () => {
  useCheckLoginStatus();

  const { isLoggedIn, userInfo } = useAppSelector((state) => state.user);

  if (!userInfo) {
    return {
      userId: '',
      displayName: '',
      email: '',
    };
  }

  const { _id: userId, displayName, email } = userInfo;

  return {
    userId,
    displayName,
    email,
    isLoggedIn,
  };
};

export default useAuthenticatedUserInfo;
