import { axios } from '@/app/config';
import { ReviewLikeRequest, ReviewLikeResponse } from '../model';

export const getAverageGradeByContent = async (contentId) => {
  const result = axios.get(`review/average/${contentId}`);

  return result;
};
export const getReviewByContentTemp = async (contentId) => {
  const result = await axios.get(`review/temp/${contentId}`);

  return result;
};

export const getReviewByContent = async (contentId, skip) => {
  const result = await axios.get(`review/${contentId}?limit=10&skip=${skip}`);
  return result.data;
};

export const getReview = async (reviewId: string) => {
  try {
    const result = await axios.get(`review/detail/${reviewId}`);
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getReviewByUser = async (userId: string, skip: number) => {
  try {
    const result = await axios.get(
      `review/user/${userId}?limit=6&skip=${skip}`,
    );

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const reviewCreate = async (reviewCreateDTO) => {
  if (reviewCreateDTO.grade === 0) throw new Error('별점 입력 필요');
  if (reviewCreateDTO.lineReview === '') throw new Error('한줄 평 입력 필요');
  try {
    const result = await axios.post('review/add', reviewCreateDTO);
    console.debug(result);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const reviewDelete = async (reviewId: string) => {
  const result = await axios.delete(`review/remove/${reviewId}`);
  return result;
};

export const reviewUpdate = async (reviewUpdateDTO) => {
  const result = await axios.put('review/update', reviewUpdateDTO);
  return result;
};

export const getReviewLikeStatus = async (reviewId, userId) => {
  try {
    const result = await axios.get(`review/like/${reviewId}/${userId}`);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const reviewLike = async (
  reviewLikeRequest: ReviewLikeRequest,
): ReviewLikeResponse => {
  try {
    const getIsLike = await axios.post(`review/like`, reviewLikeRequest);
    return getIsLike;
  } catch (error) {
    throw Error(error);
  }
};
