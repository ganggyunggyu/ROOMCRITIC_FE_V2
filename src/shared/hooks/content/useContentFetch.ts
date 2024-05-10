import * as API from '../../api/API';
import { useQuery } from '@tanstack/react-query';

const useContentFetch = (contentType: string, contentId: string) => {
  return useQuery({
    queryKey: ['detailContent', contentType, contentId],
    queryFn: () => API.fetchContentDetail(contentType, contentId),
    select: (data) => data.data,
  });
};

export default useContentFetch;
