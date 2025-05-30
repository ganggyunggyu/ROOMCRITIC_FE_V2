import { axios } from '@/app/config';

export const getUserInfo = async (userId: string) => {
  try {
    const result = await axios.get(`user/profile/id/${userId}`);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getUserScore = async (userId: string) => {
  try {
    const result = axios.get(`review/score/${userId}`);
    return result;
  } catch (error) {
    throw Error(error);
  }
};
