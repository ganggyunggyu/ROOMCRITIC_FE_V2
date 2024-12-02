import { axiosConfig } from '@/config/axios-config';

export const getAverageGradeByContent = async (contentId) => {
  const result = axiosConfig.get(`review/average/${contentId}`);

  return result;
};
export const getReviewByContentTemp = async (contentId) => {
  const result = await axiosConfig(`review/temp/${contentId}`);

  return result;
};

export const getReviewByContent = async (contentId, skip) => {
  const result = await axiosConfig(`review/${contentId}?limit=10&skip=${skip}`);
  return result.data;
};

export const getReview = async (reviewId: string) => {
  try {
    const result = await axiosConfig.get(`review/detail/${reviewId}`);
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getReviewByUser = async (userId: string, skip: number) => {
  try {
    const result = await axiosConfig.get(`review/user/${userId}?limit=6&skip=${skip}`);

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const reviewCreate = async (reviewCreateDTO) => {
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

export const reviewDelete = async (reviewId: string) => {
  const result = await axiosConfig.delete(`review/remove/${reviewId}`);
  return result;
};

export const reviewUpdate = async (reviewUpdateDTO) => {
  const result = await axiosConfig.put('review/update', reviewUpdateDTO);
  return result;
};

export const getReviewLikeStatus = async (reviewId, userId) => {
  try {
    const result = await axiosConfig.get(`review/like/${reviewId}/${userId}`);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const reviewLike = async (sendLikeReviewRequestDTO) => {
  try {
    const result = await axiosConfig.post(`review/like`, sendLikeReviewRequestDTO);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const reviewDislike = async (sendDislikeReviewRequestDTO) => {
  try {
    const result = await axiosConfig.post(`review/dislike`, sendDislikeReviewRequestDTO);
    return result;
  } catch (error) {
    throw Error(error);
  }
};
