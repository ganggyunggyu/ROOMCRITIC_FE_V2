import { TJoinUserDTO, TLoginUserDTO } from '../../app/types/main';
import AxiosConfig from '../../app/config/axios-config';
import { ReviewCreateDTO } from '../../app/types/dtos';

export const submitJoin = async (joinUserDTO: TJoinUserDTO) => {
  try {
    const result = await AxiosConfig.post('/auth/join', {
      ...joinUserDTO,
    });
    return result;
  } catch (error) {
    console.debug(error);
  }
};
export const submitLogin = async (loginUserDTO: TLoginUserDTO) => {
  try {
    const result = await AxiosConfig.post('/auth/login', loginUserDTO);
    console.debug(result);
    return result;
  } catch (error) {
    console.debug(error);
    throw Error(error.response.data);
  }
};

export const fetchLoginStatus = async () => {
  try {
    const result = await AxiosConfig.get('/auth/login/check');
    if (result.status === 200) {
      return result;
    }
    if (result.status === 201) {
      // throw Error('세션 만료');
      // return '세션 만료';
      return result;
    }
  } catch (error) {
    console.error('fetchLoginERROR !!', error);
  }
};

export const getDetailContent = async (contentType: string, contentId: string) => {
  try {
    const result = await AxiosConfig.get(`content/${contentType}/${contentId}`);
    return result;
  } catch (err) {
    console.debug(err);
  }
};

export const fetchSearchContents = async (searchValue: string) => {
  if (!searchValue) throw new Error('검색어 입력 필요');
  const result = await AxiosConfig.get(`content/search?search_value=${searchValue}`);

  return result;
};

export const fetchSearchTvContents = async (searchValue: string) => {
  if (!searchValue) throw new Error('검색어 입력 필요');
  const result = await AxiosConfig.get(`content/search/tv?search_value=${searchValue}`);

  return result;
};
export const fetchSearchMovieContents = async (searchValue: string) => {
  if (!searchValue) throw new Error('검색어 입력 필요');
  const result = await AxiosConfig.get(`content/search/movie?search_value=${searchValue}`);

  return result;
};
export const reviewCreate = async (reviewCreateDTO: ReviewCreateDTO) => {
  if (reviewCreateDTO.grade === 0) throw new Error('별점 입력 필요');
  if (reviewCreateDTO.lineReview === '') throw new Error('한줄 평 입력 필요');
  try {
    const result = await AxiosConfig.post(
      'review/create',
      { createData: reviewCreateDTO },
      { withCredentials: true },
    );
    console.debug(result);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const fetchLatestTvContent = async () => {
  const result = await AxiosConfig.get('tv/latest');
  return result;
};
export const fetchLatestMovieContent = async () => {
  const result = await AxiosConfig.get('movie/latest');
  return result;
};

export const fetchOwnerPickTvContent = async () => {
  const result = await AxiosConfig.get('tv/owner');
  return result;
};
export const fetchOwnerPickMovieContent = async () => {
  const result = await AxiosConfig.get('movie/owner');
  return result;
};
export const fetchTopRatedMovie = async () => {
  const result = await AxiosConfig.get('movie/top-rated-movies');
  return result;
};
export type AddWishContentRequestDTO = {
  userId: string;
  contentId: string;
};
export type AddWatchContentRequestDTO = {
  userId: string;
  contentId: string;
};
export type FetchWishContentRequestDTO = {
  userId: string;
  contentId: string;
};
export type FetchWatchContentRequestDTO = {
  userId: string;
  contentId: string;
};
export type FetchLikeReviewRequestDTO = {
  userId: string;
  reviewId: string;
};
export type SendLikeReviewRequestDTO = {
  userId: string;
  reviewId: string;
};
export type SendDislikeReviewRequestDTO = {
  userId: string;
  reviewId: string;
};

export const addWishContent = async (addWishContentRequestDTO: AddWishContentRequestDTO) => {
  try {
    const result = await AxiosConfig.post('contetn/wish', addWishContentRequestDTO);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const addWatchContent = async (addWatchContentRequestDTO: AddWatchContentRequestDTO) => {
  try {
    const result = await AxiosConfig.post('content/watch', addWatchContentRequestDTO);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
    // return '성공';
  }
};

export const fetchWishContent = async (fetchWishContentRequestDTO: FetchWishContentRequestDTO) => {
  try {
    const result = AxiosConfig.get(
      `content/wish/${fetchWishContentRequestDTO.userId}/${fetchWishContentRequestDTO.contentId}`,
    );
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const fetchWatchContent = async (
  fetchWatchContentRequestDTO: FetchWatchContentRequestDTO,
) => {
  try {
    const result = AxiosConfig.get(
      `content/watch/${fetchWatchContentRequestDTO.userId}/${fetchWatchContentRequestDTO.contentId}`,
    );
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const fetchLikeReview = async (fetchLikeReviewRequestDTO: FetchLikeReviewRequestDTO) => {
  //true or false
  try {
    const result = await AxiosConfig.get(
      `review/${fetchLikeReviewRequestDTO.userId}/${fetchLikeReviewRequestDTO.reviewId}`,
    );
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const sendLikeReview = async (sendLikeReviewRequestDTO: SendLikeReviewRequestDTO) => {
  try {
    const result = await AxiosConfig.post(`review/like`, sendLikeReviewRequestDTO);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const sendDislikeReview = async (
  sendDislikeReviewRequestDTO: SendDislikeReviewRequestDTO,
) => {
  try {
    const result = await AxiosConfig.post(`review/dislike`, sendDislikeReviewRequestDTO);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const getUserInfo = async (userId: string) => {
  try {
    const result = await AxiosConfig.get(`user/profile/${userId}`);
    return result;
  } catch (error) {
    throw Error(error);
  }
};
