import { useQuery } from '@tanstack/react-query';
import { fetchReviewDetail } from '../../api/API';

const useReviewDetail = (userId: string, reviewId: string) => {
  return useQuery({
    queryKey: ['detailReview', userId, reviewId],
    queryFn: () => fetchReviewDetail(userId, reviewId),
    select: (data) => data.data,
  });
};

export default useReviewDetail;
