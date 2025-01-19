import { TEST_EMAIL, TEST_PASSWORD } from '@/config/env-config';
import { LoginRequest, JoinRequest, submitJoin, submitLogin } from '@/entities';

import { beforeAll, describe, expect, it, test } from 'vitest';

const LoginMock = {
  email: TEST_EMAIL,
  password: TEST_PASSWORD,
} as LoginRequest;

test('Login', async () => {
  const result = await submitLogin(LoginMock);
  expect(result.data.isLoggedIn).toEqual(true);
});
