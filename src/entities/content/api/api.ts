import { axiosConfig } from '../../../test/axios-config';

export const addWishContent = async (WishContentRequestDTO) => {
  try {
    const result = await axiosConfig.post('content/wish', WishContentRequestDTO);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const addWatchContent = async (WatchContentRequestDTO) => {
  try {
    const result = await axiosConfig.post('content/watch', WatchContentRequestDTO);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};
