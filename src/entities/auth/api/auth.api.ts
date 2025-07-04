import { axios } from '@/app/config';
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
    const result = await axios.post('user/auth/access-token', {
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
    const result = await axios.post('/user/join', {
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
    const result = await axios.post('/user/auth/login', loginUserDTO);

    return result;
  } catch (error) {
    console.error(error);
    throw Error(error.response.data);
  }
};

export const submitLogout = async (refreshToken: string) => {
  try {
    const result = await axios.post('user/auth/logout', { refreshToken });
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const fetchLoginStatus = async () => {
  try {
    const result = await axios.get('user/login-check');
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
