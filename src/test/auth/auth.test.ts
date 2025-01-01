import { LoginRequest, JoinRequest, submitJoin, submitLogin } from '@/entities';

import { beforeAll, describe, expect, it, test } from 'vitest';

const LoginMock = {
  email: 'qwzx16@naver.com',
  password: '12Qwaszx!@',
} as LoginRequest;

test('Login', async () => {
  const result = await submitLogin(LoginMock);
  expect(result.data.isLoggedIn).toEqual(true);
});
