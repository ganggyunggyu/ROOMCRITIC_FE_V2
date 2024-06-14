import { axiosConfig } from '../../../shared/api/axios-config';

export const getUserInfo = async (userId: string) => {
  try {
    const result = await axiosConfig.get(`user/profile/id/${userId}`);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getUserScore = async (userId: string) => {
  try {
    const result = axiosConfig.get(`review/score/${userId}`);
    return result;
  } catch (error) {
    throw Error(error);
  }
};
