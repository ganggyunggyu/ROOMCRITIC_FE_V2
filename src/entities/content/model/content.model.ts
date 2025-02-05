import { AxiosPromise } from 'axios';

export type Content = {
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

export type ContentType = 'tv' | 'movie' | null;

export type InfinityQueryContentRequest = {
  pageParam: number;
  contentType: ContentType;
};
export type InfinityQueryContentResponse = {
  contentList: Content[];
};

export type RecentlyReviewedContentRequest = InfinityQueryContentRequest & {};

export type RecentlyReviewedContentResponse =
  AxiosPromise<InfinityQueryContentResponse>;

export type FilterByGenreContentRequest = InfinityQueryContentRequest & {
  genreId: number;
};

export type FilterByGenreContentResponse =
  AxiosPromise<InfinityQueryContentResponse>;
