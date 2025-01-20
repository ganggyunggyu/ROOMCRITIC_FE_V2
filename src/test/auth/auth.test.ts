import { useAppDispatch, useAppSelector } from '@/app/store';
import { setAccessToken } from '@/app/store/slice/tokenSlice';
import { setIsLoggedIn, setUserInfo } from '@/app/store/slice/userSlice';
import { TEST_EMAIL, TEST_PASSWORD } from '@/config/env-config';
import { LoginRequest, submitLogin } from '@/entities';

import { expect, test, vi } from 'vitest';

const mockDispatch = vi.fn();
vi.mock('@/app/store', () => ({
  useAppDispatch: vi.fn(() => mockDispatch),
  useAppSelector: vi.fn(),
}));

const LOGIN_MOCK: LoginRequest = {
  email: TEST_EMAIL,
  password: TEST_PASSWORD,
};

test('Login', async () => {
  vi.mocked(useAppSelector).mockImplementation((selector) => {
    if (selector.toString().includes('state.user')) {
      return {
        userInfo: { id: 'user1', name: 'Test User' },
        isLoggedIn: true,
      };
    }
    return null;
  });

  const result = await submitLogin(LOGIN_MOCK);

  const { userInfo, isLoggedIn, accessToken } = result.data;

  mockDispatch(setIsLoggedIn(isLoggedIn));
  mockDispatch(setUserInfo(userInfo));
  mockDispatch(setAccessToken(accessToken));

  const user = useAppSelector((state) => state.user);

  console.log(user);

  expect(isLoggedIn).toEqual(true);
  expect(user).toEqual({
    userInfo: { id: 'user1', name: 'Test User' },
    isLoggedIn: true,
  });
});
