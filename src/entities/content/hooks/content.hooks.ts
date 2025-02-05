import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  addWatchContent,
  addWishContent,
  getContentByOne,
  getLatestContent,
  getPopularContent,
  getRecentlyReviewedContent,
  getSearchContent,
} from '../api';
import { TypeNumber, useSearchInput } from '@/shared';
import { useAppDispatch } from '@/app/store';
import { setSearchContents } from '@/app/store/slice/searchSlice';
import { ContentType } from '../model';

export const useAddWatchContent = () => {
  return useMutation({
    mutationFn: addWatchContent,
  });
};

export const useAddWishContent = () => {
  return useMutation({
    mutationFn: addWishContent,
  });
};

export const usePopularContentQuery = (contentType?: string) => {
  const t = contentType ? contentType : null;
  return useInfiniteQuery({
    queryKey: ['popularContent'],
    queryFn: ({ pageParam }) => getPopularContent(pageParam, t),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, allPages) => {
      return allPages + 10;
    },
    select: (data) => {
      return data;
    },
  });
};


export const useLatestContentQuery = (
  contentType?: string,
): UseInfiniteQueryResult => {
  const t = contentType ? contentType : null;
  return useInfiniteQuery({
    queryKey: ['latestContent'],
    queryFn: ({ pageParam }) => getLatestContent(pageParam, t),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, allPages) => {
      return allPages + 10;
    },
    select: (data) => data,
  });
};

export const useInfinitySearchContentQuery = (searchType: number) => {
  const contentSearchInput = useSearchInput('', 0);
  const movieSearchInput = useSearchInput('', 1);
  const tvSearchInput = useSearchInput('', 2);
  return useInfiniteQuery({
    queryKey: ['searchContents', contentSearchInput.value, searchType],
    queryFn: () => {
      if (searchType === 0) {
        if (!contentSearchInput.value) return null;
        return getSearchContent(
          contentSearchInput.value,
          contentSearchInput.typeName,
        );
      }
      if (searchType === 1) {
        if (!movieSearchInput.value) return null;
        return getSearchContent(
          movieSearchInput.value,
          movieSearchInput.typeName,
        );
      }
      if (searchType === 2) {
        if (!contentSearchInput.value) return null;
        return getSearchContent(
          contentSearchInput.value,
          tvSearchInput.typeName,
        );
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, allPages) => {
      return allPages + 10;
    },
    select: (data) => data,
  });
};

export const useSearchContentQuery = (searchType: TypeNumber) => {
  const dispatch = useAppDispatch();
  const searchInput = useSearchInput('', searchType);
  const searchContents = useQuery({
    queryKey: ['searchContents', searchInput.value, searchType],
    queryFn: () => {
      if (!searchInput.value) return null;
      return getSearchContent(searchInput.value, searchInput.typeName);
    },

    select: (data) => {
      dispatch(setSearchContents(data.data));
      return data.data;
    },
  });
  return {
    searchContents,
    searchInput,
  };
};
export const useContentFetch = (contentId: string) => {
  return useQuery({
    queryKey: ['content', contentId],
    queryFn: () => getContentByOne(contentId),
    select: (data) => {
      console.log(data);
      return data.data;
    },
  });
};

export const useRecentlyCreateReviewContent = (contentType: ContentType) => {
  return useInfiniteQuery({
    queryKey: ['recently-create-content-list'],
    queryFn: ({ pageParam }) =>
      getRecentlyReviewedContent({ pageParam, contentType }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, allPages) => {
      return allPages + 10;
    },
    select: (data) => data,
  });
};
