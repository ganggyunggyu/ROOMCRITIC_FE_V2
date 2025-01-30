import { setAccessToken } from '@/app/store/slice/tokenSlice';
import { setIsLoggedIn, setUserInfo } from '@/app/store/slice/userSlice';
import { TEST_EMAIL, TEST_PASSWORD } from '@/config/env-config';
import { LoginRequest, submitLogin } from '@/entities';

import { beforeEach, expect, test, vi } from 'vitest';
const mockDispatch = vi.fn();
const mockSelector = vi.fn();

vi.mock('@/app/store', () => ({
  useAppDispatch: vi.fn(() => mockDispatch),
  useAppSelector: vi.fn(() => mockSelector),
}));

const LOGIN_MOCK: LoginRequest = {
  email: TEST_EMAIL,
  password: TEST_PASSWORD,
};

test('Login', async () => {
  const result = await submitLogin(LOGIN_MOCK);

  const { userInfo, isLoggedIn, accessToken } = result.data;

  mockDispatch(setIsLoggedIn(isLoggedIn));
  mockDispatch(setUserInfo(userInfo));
  mockDispatch(setAccessToken(accessToken));

  console.log(mockDispatch.mock.results);

  expect(isLoggedIn).toEqual(true);

  return {
    userInfo,
    isSucess: true,
  };
});
