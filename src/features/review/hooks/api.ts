import { axiosConfig } from '../../../test/axios-config';

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
    console.log(result);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
