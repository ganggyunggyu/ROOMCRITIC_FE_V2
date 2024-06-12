export type TContent = {
  id: number;
  _id: string;
  title?: string;
  contentName?: string;
  releaseDate: string;
  grade?: number;
  voteAverage: number;
  userName?: string;
  contentPosterImg?: string;
  posterPath?: string;
  backdropPath?: string;
  contentType?: string;
};
export type TReview = {
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

export type TCardContent = {
  id: number;
  _id: string;
  title?: string;
  contentName?: string;
  releaseDate: string;
  grade?: number;
  voteAverage: number;
  userName?: string;
  contentPosterImg?: string;
  posterPath?: string;
  backdropPath?: string;
  contentType?: string;
};

export type TUserInfo = {
  _id?: string;
  userId?: string;
  displayName: string;
  phoneNumber: string;
  email: string;
};
