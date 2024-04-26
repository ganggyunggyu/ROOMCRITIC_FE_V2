import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../api/API';

const useGetUserInfo = (userId: string) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserInfo(userId),
    select: (data) => data.data,
  });
};

export default useGetUserInfo;
