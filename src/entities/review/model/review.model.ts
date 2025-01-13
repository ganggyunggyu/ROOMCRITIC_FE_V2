import { AxiosPromise } from 'axios';

export type Review = {
  _id: string;
  userId: string;
  contentId: string;
  userName: string;
  lineReview: string;
  longReview?: string;
  grade: number;
  contentPosterImg: string;
  contentBackdropImg: string;
  contentName: string;
  contentType: string;
  like?: number;
};
export type ReviewLikeRequest = {
  userId: string;
  reviewId: string;
};

export type ReviewLikeResponse = AxiosPromise<{
  status: number;
  isSuccess: boolean;
}>;
export type GetReviewByContentIdRequest = {
  contentId: string;
  skip?: number;
};
export type GetReviewResponse = AxiosPromise<{}>;
export type GetReviewByReviewIdRequest = {};
