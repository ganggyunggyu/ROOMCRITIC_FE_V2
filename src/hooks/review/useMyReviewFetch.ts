import { useQuery } from '@tanstack/react-query';
import axiosConfig from '../../api/axiosConfig';

const fetchMyReviews = async (userId: string) => {
  const result = await axiosConfig.get(`review/${userId}`);
  return result;
};

const useMyReviewFetch = (userId: string) => {
  const myReviewQuery = useQuery({
    queryKey: ['myReview', userId],
    queryFn: () => fetchMyReviews(userId),
  });
  return { myReviewQuery };
};

export default useMyReviewFetch;
