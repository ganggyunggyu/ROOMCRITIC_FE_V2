import { useQuery } from '@tanstack/react-query';
import * as A from './api';
import { useParams } from 'react-router-dom';

export const useGetUserInfo = () => {
  const { userIdParam } = useParams();
  const fetchUserInfoQuery = useQuery({
    queryKey: ['userProfile', userIdParam],
    queryFn: () => A.getUserInfo(userIdParam),
    select: (data) => data.data,
  });
  const fetchUserScoreQuery = useQuery({
    queryKey: ['genreScore', userIdParam],
    queryFn: () => A.getUserScore(userIdParam),
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
