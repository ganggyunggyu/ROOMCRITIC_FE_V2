import { useQuery } from '@tanstack/react-query';
import axiosConfig from '../../api/AxiosConfig';

const fetchSelectedContentReviews = async (contentType: string, contentId: string) => {
  try {
    const result = await axiosConfig.get(`review/${contentType}/${contentId}`);
    return result;
  } catch (err) {
    console.log(err);
  }
};
const useSelectedContentReviews = (contentType: string, contentId: string) => {
  const selectedContentReviewsQuery = useQuery({
    queryKey: ['selectContentReviews', contentType, contentId],
    queryFn: () => fetchSelectedContentReviews(contentType, contentId),
  });
  return { selectedContentReviewsQuery };
};

export default useSelectedContentReviews;
