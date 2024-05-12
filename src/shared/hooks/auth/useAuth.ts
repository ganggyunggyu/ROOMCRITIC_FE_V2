import { useAppSelector } from '../../../app/store';

const useAuth = () => {
  const { isLoggedIn, userInfo } = useAppSelector((state) => state.user);

  if (!isLoggedIn) {
    return null;
  }

  const { _id: userId, displayName, email } = userInfo;

  return {
    userId,
    displayName,
    email,
    isLoggedIn,
  };
};

export default useAuth;
