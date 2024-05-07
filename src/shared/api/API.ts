import AxiosConfig from '../../config/axios-config';
import * as DTO from '../../app/types/dtos';

export const submitJoin = async (joinUserDTO: DTO.JoinRequestDTO) => {
  try {
    const result = await AxiosConfig.post('/auth/join', {
      ...joinUserDTO,
    });
    return result;
  } catch (error) {
    console.debug(error);
  }
};

export const submitLogin = async (loginUserDTO: DTO.LoginRequestDTO) => {
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
      return result;
    }
  } catch (error) {
    console.error('fetchLoginERROR !!', error);
  }
};

export const fetchContentDetail = async (contentType: string, contentId: string) => {
  try {
    const result = await AxiosConfig.get(`content/${contentType}/${contentId}`);
    return result;
  } catch (err) {
    console.debug(err);
  }
};

export const fetchSearchedContent = async (searchValue: string) => {
  if (!searchValue) throw new Error('검색어 입력 필요');
  const result = await AxiosConfig.get(`content/search?search_value=${searchValue}`);
  return result;
};

export const fetchSearchedTvContent = async (searchValue: string) => {
  if (!searchValue) throw new Error('검색어 입력 필요');
  const result = await AxiosConfig.get(`content/search/tv?search_value=${searchValue}`);
  return result;
};

export const fetchSearchedMovieContent = async (searchValue: string) => {
  if (!searchValue) throw new Error('검색어 입력 필요');
  const result = await AxiosConfig.get(`content/search/movie?search_value=${searchValue}`);
  return result;
};

export const fetchContentReviews = async (contentType: string, contentId: string) => {
  try {
    const result = await AxiosConfig.get(`review/${contentType}/${contentId}`);
    return result;
  } catch (err) {
    console.log(err);
  }
};
export const fetchUserReview = async (userId: string) => {
  const result = await AxiosConfig.get(`review/${userId}`);
  return result;
};

export const reviewCreate = async (reviewCreateDTO: DTO.ReviewCreateDTO) => {
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

export const reviewDelete = async (reviewDeleteDTO: DTO.ReviewDeleteDTO) => {
  try {
    const result = await AxiosConfig.delete('review/delete', {
      data: { reviewId: reviewDeleteDTO.reviewId, userId: reviewDeleteDTO.userId },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error; // 에러를 호출하는 쪽으로 전파
  }
};

export const fetchReviewDetail = async (userId: string, reviewId: string) => {
  try {
    const result = await AxiosConfig.get(`review/detail/${userId}/${reviewId}`);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const reviewUpdate = async (reviewUpdateDTO: DTO.ReviewUpdateDTO) => {
  const result = await AxiosConfig.patch('review/update', { updateData: reviewUpdateDTO });
  return result;
};

export const fetchLatestTvContents = async () => {
  const result = await AxiosConfig.get('tv/latest');
  return result;
};

export const fetchLatestMovieContents = async () => {
  const result = await AxiosConfig.get('movie/latest');
  return result;
};

export const fetchOwnerPickedTvContents = async () => {
  const result = await AxiosConfig.get('tv/owner');
  return result;
};

export const fetchOwnerPickedMovieContents = async () => {
  const result = await AxiosConfig.get('movie/owner');
  return result;
};

export const fetchTopRatedMovies = async () => {
  const result = await AxiosConfig.get('movie/top-rated-movies');
  return result;
};

export const addWishContent = async (WishContentRequestDTO: DTO.WishContentRequestDTO) => {
  try {
    const result = await AxiosConfig.post('content/wish', WishContentRequestDTO);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const addWatchContent = async (WatchContentRequestDTO: DTO.WatchContentRequestDTO) => {
  try {
    const result = await AxiosConfig.post('content/watch', WatchContentRequestDTO);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const fetchContentWish = async (
  fetchWishContentRequestDTO: DTO.FetchWishContentRequestDTO,
) => {
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

export const fetchContentWatch = async (
  fetchWatchContentRequestDTO: DTO.FetchWatchContentRequestDTO,
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

export const fetchReviewLikeStatus = async (
  fetchLikeReviewRequestDTO: DTO.FetchLikeReviewRequestDTO,
) => {
  try {
    const result = await AxiosConfig.get(
      `review/${fetchLikeReviewRequestDTO.userId}/${fetchLikeReviewRequestDTO.reviewId}`,
    );
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const sendLikeReview = async (sendLikeReviewRequestDTO: DTO.SendLikeReviewRequestDTO) => {
  try {
    const result = await AxiosConfig.post(`review/like`, sendLikeReviewRequestDTO);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const sendDislikeReview = async (
  sendDislikeReviewRequestDTO: DTO.SendDislikeReviewRequestDTO,
) => {
  try {
    const result = await AxiosConfig.post(`review/dislike`, sendDislikeReviewRequestDTO);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const fetchUserInfo = async (userId: string) => {
  try {
    const result = await AxiosConfig.get(`user/profile/${userId}`);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const fetchGenreScore = async (userId: string) => {
  try {
    const result = AxiosConfig.get(`/score/${userId}`);
    return result;
  } catch (error) {
    throw Error(error);
  }
};
