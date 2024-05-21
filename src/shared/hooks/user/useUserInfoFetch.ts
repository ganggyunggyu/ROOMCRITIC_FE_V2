import { useQuery } from '@tanstack/react-query';
import { fetchGenreScore, fetchUserInfo } from '../../api/api';

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

  const { data: userInfo, isLoading: isUserInfoLoading } = fetchUserInfoQuery;
  const { data: score, isLoading: isScoreLoading } = fetchUserScoreQuery;

  return {
    userInfo,
    isUserInfoLoading,
    score,
    isScoreLoading,
  };
};

export default useUserInfoFetch;
