export type ReviewCreateDTO = {
  userId: string;
  userName: string;
  lineReview: string;
  grade: number;
  contentPosterImg: string;
  contentBackdropImg: string;
  contentName: string;
  contentId: string;
  contentType: string;
};

export type ReviewDeleteDTO = {
  userId: string;
  reviewId: string;
};

export type ReviewUpdateDTO = {
  userId: string;
  reviewId: string;
  lineReview: string;
  grade: number;
};

export type LoginRequestDTO = {
  email: string;
  password: string;
};
export type JoinRequestDTO = {
  email: string;
  password: string;
  displayName: string;
  phoneNumber: string;
};
export type WishContentRequestDTO = {
  userId: string;
  contentId: string;
};

export type WatchContentRequestDTO = {
  userId: string;
  contentId: string;
};

export type FetchWishContentRequestDTO = {
  userId: string;
  contentId: string;
};

export type FetchWatchContentRequestDTO = {
  userId: string;
  contentId: string;
};

export type FetchLikeReviewRequestDTO = {
  userId: string;
  reviewId: string;
};

export type SendLikeReviewRequestDTO = {
  userId: string;
  reviewId: string;
};

export type SendDislikeReviewRequestDTO = {
  userId: string;
  reviewId: string;
};
