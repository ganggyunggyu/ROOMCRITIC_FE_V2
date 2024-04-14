export type TLoginUserDTO = {
  email: string;
  password: string;
};
export type TJoinUserDTO = {
  email: string;
  password: string;
  displayName: string;
  phoneNumber: string;
};
export type TContent = {
  adult: boolean;
  backdrop_path: string;
  content_type: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  _id: string;
};
export type TReviewCreateDTO = {
  userId: string;
  userName: string;
  lineReview: string;
  longReview: string;
  grade: number;
  contentPosterImg: string;
  contentBackdropImg: string;
  contentName: string;
  contentId: string;
  contentType: string;
};
