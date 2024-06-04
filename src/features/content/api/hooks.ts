import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPopularContent, getLatestContent, getSearchContent, getContentByOne } from './api';
import { useAppDispatch } from '../../../app/store';
import useSearchInput from '../../../shared/hooks/common/useSearchInput';
import { setSearchContents } from '../../../app/store/slice/searchSlice';

export const usePopularContentQuery = (contentType?: string) => {
  const t = contentType ? contentType : null;
  return useInfiniteQuery({
    queryKey: ['popularContent'],
    queryFn: ({ pageParam }) => getPopularContent(pageParam, t),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, allPages) => {
      return allPages + 10;
    },
    select: (data) => data.pages,
  });
};

export const useLatestContentQuery = (contentType?: string) => {
  const t = contentType ? contentType : null;
  return useInfiniteQuery({
    queryKey: ['latestContent'],
    queryFn: ({ pageParam }) => getLatestContent(pageParam, t),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, allPages) => {
      return allPages + 10;
    },
    select: (data) => data.pages,
  });
};

export const useSearchContentQuery = (searchType: number) => {
  const dispatch = useAppDispatch();
  const contentSearchInput = useSearchInput('', 0);
  const movieSearchInput = useSearchInput('', 1);
  const tvSearchInput = useSearchInput('', 2);

  const searchContents = useQuery({
    queryKey: ['searchContents', contentSearchInput.value, searchType],
    queryFn: () => {
      if (searchType === 0) {
        if (!contentSearchInput.value) return null;
        return getSearchContent(contentSearchInput.value, contentSearchInput.typeName);
      }
      if (searchType === 1) {
        if (!movieSearchInput.value) return null;
        return getSearchContent(movieSearchInput.value, movieSearchInput.typeName);
      }
      if (searchType === 2) {
        if (!contentSearchInput.value) return null;
        return getSearchContent(contentSearchInput.value, tvSearchInput.typeName);
      }
    },
    select: (data) => {
      dispatch(setSearchContents(data.data));

      return data.data;
    },
  });

  return {
    searchContents,
    contentSearchInput,
    movieSearchInput,
    tvSearchInput,
  };
};
export const useContentFetch = (contentId: string) => {
  return useQuery({
    queryKey: ['content', contentId],
    queryFn: () => getContentByOne(contentId),
    select: (data) => {
      return data.data;
    },
  });
};
