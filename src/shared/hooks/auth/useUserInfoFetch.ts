import { useQuery } from '@tanstack/react-query';
import { fetchGenreScore, fetchUserInfo } from '../../api/API';

const useUserInfoFetch = (userId: string) => {
  const fetchUserInfoQuery = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserInfo(userId),
    select: (data) => data.data,
  });
  const fetchUserScoreQuery = useQuery({
    queryKey: ['genreScore', userId],
    queryFn: () => fetchGenreScore(userId),
    select: (data) => data.data,
  });

  const { data: UserInfo, isLoading: isUserInfoLoading } = fetchUserInfoQuery;
  const { data: Score, isLoading: isScoreLoading } = fetchUserScoreQuery;

  return {
    UserInfo,
    isUserInfoLoading,
    Score,
    isScoreLoading,
  };
};

export default useUserInfoFetch;
