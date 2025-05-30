import { axios } from '@/app/config';
import {
  FilterByGenreContentRequest,
  FilterByGenreContentResponse,
  RecentlyReviewedContentRequest,
  RecentlyReviewedContentResponse,
} from '../model';

export const getContentByOne = async (contentId: string) => {
  try {
    const result = await axios.get(`content/${contentId}`);
    return result;
  } catch (err) {
    console.debug(err);
  }
};

export const getSearchContent = async (
  searchValue: string,
  contentType?: string,
) => {
  if (!searchValue) throw new Error('검색어 입력 필요');
  if (searchValue.length <= 1) throw new Error('검색어 입력 필요');
  const result = await axios.get(
    `content/?q=${searchValue}&content_type=${contentType}`,
  );
  return result;
};

export const getLatestContent = async (
  pageParam: number,
  contentType?: string,
) => {
  const url = contentType
    ? `content/latest?skip=${pageParam}&content_type=${contentType}`
    : `content/latest?skip=${pageParam}`;
  const result = await axios.get(url);

  return result;
};

export const getPopularContent = async (
  pageParam: number,
  contentType?: string,
) => {
  const url = contentType
    ? `content/popular?skip=${pageParam}&content_type=${contentType}`
    : `content/popular?skip=${pageParam}`;

  const result = await axios.get(url);

  return result;
};

export const getRecentlyReviewedContent = async (
  requestRecentlyReviewdContent: RecentlyReviewedContentRequest,
): RecentlyReviewedContentResponse => {
  const { contentType, pageParam } = requestRecentlyReviewdContent;

  const url = contentType
    ? `/content/recently/created-review?skip=${pageParam}&content_type=${contentType}`
    : `/content/recently/created-review?skip=${pageParam}`;

  const recentlyCreateReviewPromise = await axios.get(url);

  return recentlyCreateReviewPromise;
};

export const getFilterByGenreContent = async (
  filterByGenreContentRequest: FilterByGenreContentRequest,
): FilterByGenreContentResponse => {
  const { genreId, pageParam } = filterByGenreContentRequest;

  const result = await axios.get(
    `/content/genre/${genreId}/?skip=${pageParam}`,
  );

  return result;
};

export const addWishContent = async (WishContentRequestDTO) => {
  try {
    const result = await axios.post('content/wish', WishContentRequestDTO);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const addWatchContent = async (WatchContentRequestDTO) => {
  try {
    const result = await axios.post('content/watch', WatchContentRequestDTO);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};
