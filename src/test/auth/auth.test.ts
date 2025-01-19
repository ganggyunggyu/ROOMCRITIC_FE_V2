import { TEST_EMAIL, TEST_PASSWORD } from '@/config/env-config';
import { LoginRequest, JoinRequest, submitJoin, submitLogin } from '@/entities';

import { beforeAll, describe, expect, it, test } from 'vitest';

const LOGIN_MOCK = {
  email: TEST_EMAIL,
  password: TEST_PASSWORD,
} as LoginRequest;

test('Login', async () => {
  const result = await submitLogin(LOGIN_MOCK);
  expect(result.data.isLoggedIn).toEqual(true);
});
