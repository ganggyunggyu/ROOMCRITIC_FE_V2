import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '../../api/API';

const useUserInfoFetch = (userId: string) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserInfo(userId),
    select: (data) => data.data,
  });
};

export default useUserInfoFetch;
