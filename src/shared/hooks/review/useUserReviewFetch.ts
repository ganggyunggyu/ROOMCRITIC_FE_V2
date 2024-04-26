import { useQuery } from '@tanstack/react-query';
import { fetchUserReview } from '../../api/API';

const useUserReviewFetch = (userId: string) => {
  return useQuery({
    queryKey: ['userReview', userId],
    queryFn: () => fetchUserReview(userId),
  });
};

export default useUserReviewFetch;
