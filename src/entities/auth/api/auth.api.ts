import { axiosConfig } from '@/config/axios-config';
import { AxiosPromise } from 'axios';
import {
  GetAccessTokenRequest,
  JoinRequest,
  LoginRequest,
  LoginResponse,
} from '../model';

export const getAccessToken = async (
  getAccessTokenRequest: GetAccessTokenRequest,
) => {
  const { userId, refreshToken } = getAccessTokenRequest;
  try {
    const result = await axiosConfig.post('user/auth/access-token', {
      userId,
      refreshToken,
    });
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

export const submitJoin = async (joinUserDTO: JoinRequest) => {
  try {
    const result = await axiosConfig.post('/user/join', {
      ...joinUserDTO,
    });
    return result;
  } catch (error) {
    console.debug(error);
  }
};

export const submitLogin = async (
  loginUserDTO: LoginRequest,
): AxiosPromise<LoginResponse> => {
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

export const fetchLoginStatus = async () => {
  try {
    const result = await axiosConfig.get('/user/login-check');
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
