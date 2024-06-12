import { axiosConfig } from '../../../test/axios-config';

export const getAverageGradeByContent = async (contentId) => {
  const result = axiosConfig.get(`review/average/${contentId}`);

  return result;
};
