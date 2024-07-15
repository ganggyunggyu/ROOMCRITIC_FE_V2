import { axiosConfig } from '../../../shared/api/axios-config';

export const getAverageGradeByContent = async (contentId) => {
  const result = axiosConfig.get(`review/average/${contentId}`);

  return result;
};
