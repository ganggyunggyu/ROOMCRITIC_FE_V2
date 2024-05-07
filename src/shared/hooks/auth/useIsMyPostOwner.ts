import { useParams } from 'react-router-dom';
import useAuthenticatedUserInfo from './useAuthenticatedUserInfo';

const useIsMyPostOwner = () => {
  const { userId } = useAuthenticatedUserInfo();
  const { userIdParam = '' } = useParams();

  return userId === userIdParam;
};

export default useIsMyPostOwner;
