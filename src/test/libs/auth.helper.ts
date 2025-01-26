import { LoginRequest, submitLogin } from '@/entities';

export const performLogin = async (email: string, password: string) => {
  const LOGIN_MOCK: LoginRequest = { email, password };
  const result = await submitLogin(LOGIN_MOCK);

  const { userInfo, isLoggedIn, accessToken } = result.data;

  return {
    userInfo,
    isLoggedIn,
    accessToken,
  };
};
