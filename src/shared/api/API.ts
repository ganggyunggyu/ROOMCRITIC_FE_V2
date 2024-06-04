import * as DTO from '../../app/types/dtos';
import { axiosConfig } from '../../test/axios-config';

export const submitJoin = async (joinUserDTO: DTO.JoinRequestDTO) => {
  try {
    const result = await axiosConfig.post('/user/join', {
      ...joinUserDTO,
    });
    return result;
  } catch (error) {
    console.debug(error);
  }
};

export const submitLogin = async (loginUserDTO: DTO.LoginRequestDTO) => {
  try {
    const result = await axiosConfig.post('/user/auth/login', loginUserDTO);
    // console.debug(result);
    return result;
  } catch (error) {
    console.debug(error);
    throw Error(error.response.data);
  }
};

export const submitLogout = async (refreshToken: string) => {
  try {
    const result = await axiosConfig.post('user/auth/logout', { refreshToken });
    return result;
  } catch (err) {
    console.error(err);
  }
};
export const fetchAccessToken = async (userId: string, refreshToken: string) => {
  try {
    const result = await axiosConfig.post('user/auth/access-token', { userId, refreshToken });
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

export const fetchContentReviews = async (contentType: string, contentId: string) => {
  try {
    const result = await axiosConfig.get(`review/content/${contentType}/${contentId}`);
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const fetchUserReview = async (userId: string) => {
  const result = await axiosConfig.get(`review/user/${userId}`);
  return result;
};

export const reviewCreate = async (reviewCreateDTO: DTO.ReviewCreateDTO) => {
  if (reviewCreateDTO.grade === 0) throw new Error('별점 입력 필요');
  if (reviewCreateDTO.lineReview === '') throw new Error('한줄 평 입력 필요');
  try {
    const result = await axiosConfig.post('review/add', reviewCreateDTO);
    console.debug(result);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const reviewDelete = async (reviewDeleteDTO: DTO.ReviewDeleteDTO) => {
  try {
    const result = await axiosConfig.delete(`review/remove/${reviewDeleteDTO.reviewId}`);
    return result;
  } catch (error) {
    console.error(error);
    throw error; // 에러를 호출
  }
};

export const reviewUpdate = async (reviewUpdateDTO: DTO.ReviewUpdateDTO) => {
  const result = await axiosConfig.put('review/update', reviewUpdateDTO);
  return result;
};

export const addWishContent = async (WishContentRequestDTO: DTO.WishContentRequestDTO) => {
  try {
    const result = await axiosConfig.post('content/wish', WishContentRequestDTO);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const addWatchContent = async (WatchContentRequestDTO: DTO.WatchContentRequestDTO) => {
  try {
    const result = await axiosConfig.post('content/watch', WatchContentRequestDTO);
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
    const result = axiosConfig.get(
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
    const result = axiosConfig.get(
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
    const result = await axiosConfig.get(
      `review/send/like/${fetchLikeReviewRequestDTO.reviewId}/${fetchLikeReviewRequestDTO.userId}`,
    );
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const sendLikeReview = async (sendLikeReviewRequestDTO: DTO.SendLikeReviewRequestDTO) => {
  try {
    const result = await axiosConfig.post(`review/send/like`, sendLikeReviewRequestDTO);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const sendDislikeReview = async (
  sendDislikeReviewRequestDTO: DTO.SendDislikeReviewRequestDTO,
) => {
  try {
    const result = await axiosConfig.post(`review/send/dislike`, sendDislikeReviewRequestDTO);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const fetchUserInfo = async (userId: string) => {
  try {
    const result = await axiosConfig.get(`user/profile/id/${userId}`);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGenreScore = async (userId: string) => {
  try {
    const result = axiosConfig.get(`review/score/${userId}`);
    return result;
  } catch (error) {
    throw Error(error);
  }
};
