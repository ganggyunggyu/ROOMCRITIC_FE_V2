import * as API from '../../api/API';
import { useQuery } from '@tanstack/react-query';

const useContentFetch = (contentType: string, contentId: string) => {
  const queryKey = ['detailContent', contentType, contentId];

  const detailContentQuery = useQuery({
    queryKey,
    queryFn: () => API.getDetailContent(contentType, contentId),
  });

  return {
    detailContentQuery,
  };
};

export default useContentFetch;
