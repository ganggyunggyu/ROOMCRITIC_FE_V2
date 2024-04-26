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
export type TReview = {
  review: string;
};

export type TCardContent = {
  id: number;
  _id: string;
  title?: string;
  userId?: string;
  contentName?: string;
  // release_date: Date | string;
  release_date: string;
  lineReview?: string;
  grade?: number;
  vote_average: number;
  userName?: string;
  contentPosterImg?: string;
  poster_path?: string;
  backdrop_path?: string;
  content_type?: string;
};

export type TUserInfo = { _id: string; displayName: string; phoneNumber: string; email: string };
