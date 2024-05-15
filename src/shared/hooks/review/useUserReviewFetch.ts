import { useQuery } from '@tanstack/react-query';
import { fetchUserReview } from '../../api/api';

const useUserReviewFetch = (userId: string) => {
  return useQuery({
    queryKey: ['userReview', userId],
    queryFn: () => fetchUserReview(userId),
    select: (data) => data.data,
  });
};

export default useUserReviewFetch;
