import { useQuery } from '@tanstack/react-query';
import { fetchContentReviews } from '../../api/API';

const useContentReviews = (contentType: string, contentId: string) => {
  return useQuery({
    queryKey: ['selectContentReviews', contentType, contentId],
    queryFn: () => fetchContentReviews(contentType, contentId),
  });
};

export default useContentReviews;
