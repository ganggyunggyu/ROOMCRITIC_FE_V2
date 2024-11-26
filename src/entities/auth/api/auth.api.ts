import { axiosConfig } from '../../../shared/api/axios-config';

export const getAccessToken = async (userId: string, refreshToken: string) => {
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

export const submitJoin = async (joinUserDTO) => {
  try {
    const result = await axiosConfig.post('/user/join', {
      ...joinUserDTO,
    });
    return result;
  } catch (error) {
    console.debug(error);
  }
};

export const submitLogin = async (loginUserDTO) => {
  try {
    const result = await axiosConfig.post('/user/auth/login', loginUserDTO);
    console.debug(result);
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
