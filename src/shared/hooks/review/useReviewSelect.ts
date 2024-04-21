import { useQuery } from '@tanstack/react-query';
import axiosConfig from '../../api/AxiosConfig';
const fetchSelectReview = async (userId: string, reviewId: string) => {
  try {
    const result = await axiosConfig.get(`review/detail/${userId}/${reviewId}`);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const useReviewSelect = (userId: string, reviewId: string) => {
  const selectReviewQuery = useQuery({
    queryKey: ['selectReview', userId, reviewId],
    queryFn: () => fetchSelectReview(userId, reviewId),
  });
  return { selectReviewQuery };
};

export default useReviewSelect;
