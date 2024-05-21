import { useQuery } from '@tanstack/react-query';
import { fetchReviewLikeStatus } from '../../../shared/api/api';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store';

export const useReviewLikeFetch = () => {
  const { userIdParam, reviewIdParam } = useParams();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  return useQuery({
    queryKey: ['like', reviewIdParam, userIdParam],
    queryFn: () => fetchReviewLikeStatus({ reviewId: reviewIdParam, userId: userInfo.userId }),
    select: (data) => data.data,
  });
};
