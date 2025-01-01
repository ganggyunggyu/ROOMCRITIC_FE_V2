import {
  reviewLike,
  ReviewLikeRequest,
  submitLogin,
  LoginRequest,
} from '@/entities';
import { beforeAll, expect, test } from 'vitest';

let userId = null;
let reviewId = null;

const ReviewLikeMock: ReviewLikeRequest = {
  userId: userId,
  reviewId: reviewId,
};
const LoginMock = {
  email: 'qwzx16@naver.com',
  password: '12Qwaszx!@',
} as LoginRequest;

beforeAll(async () => {
  test('Login', async () => {
    const result = await submitLogin(LoginMock);

    userId = result.data.userInfo._id;
    reviewId = '';

    expect(result.data.isLoggedIn).toEqual(true);
  });
});

test('ReviewLike', async () => {
  if (reviewId && userId) {
    try {
      const result = await reviewLike(ReviewLikeMock);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
});
