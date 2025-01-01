import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import {
  addWatchContent,
  addWishContent,
  getContentByOne,
  getLatestContent,
  getPopularContent,
  getSearchContent,
} from '../api';
import { useSearchInput } from '@/shared';
import { useAppDispatch } from '@/app/store';
import { setSearchContents } from '@/app/store/slice/searchSlice';

export const useAddWatchContent = () => {
  return useMutation({
    mutationFn: addWatchContent,
    // onSuccess(data, variables, context) {
    //   console.log('Success', data);
    //   console.log('Success', variables);
    //   console.log('Success', context);
    // },
    // onError(error, variables, context) {
    //   console.log('Error', error);
    //   console.log('Error', variables);
    //   console.log('Error', context);
    // },
    // onSettled(data, error, variables, context) {
    //   console.log('Settled', data);
    //   console.log('Settled', error);
    //   console.log('Settled', variables);
    //   console.log('Settled', context);
    // },
  });
};

export const useAddWishContent = () => {
  return useMutation({
    mutationFn: addWishContent,
    // onSuccess(data, variables, context) {
    //   console.log('Success', data);
    //   console.log('Success', variables);
    //   console.log('Success', context);
    // },
    // onError(error, variables, context) {
    //   console.log('Error', error);
    //   console.log('Error', variables);
    //   console.log('Error', context);
    // },
    // onSettled(data, error, variables, context) {
    //   console.log('Settled', data);
    //   console.log('Settled', error);
    //   console.log('Settled', variables);
    //   console.log('Settled', context);
    // },
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
