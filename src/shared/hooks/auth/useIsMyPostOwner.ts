import { useParams } from 'react-router-dom';
import useAuthInfo from './useAuth';

const useIsMyPostOwner = () => {
  const { userId } = useAuthInfo();
  const { userIdParam = '' } = useParams();

  return userId === userIdParam;
};

export default useIsMyPostOwner;
