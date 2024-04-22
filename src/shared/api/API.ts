import { Dispatch, SetStateAction } from 'react';
import { TContent, TJoinUserDTO, TLoginUserDTO } from '../../app/types/main';

import AxiosConfig from './AxiosConfig';
import { ReviewCreateDTO } from '../../app/types/dtos';

export const submitJoin = async (joinUserDTO: TJoinUserDTO) => {
  try {
    const result = await AxiosConfig.post('/auth/join', {
      ...joinUserDTO,
    });
    // if (result.status === 201) throw Error();
    return result;
  } catch (error) {
    console.debug(error);
  }
};
export const submitLogin = async (loginUserDTO: TLoginUserDTO) => {
  try {
    const result = await AxiosConfig.post('/auth/login', loginUserDTO);
    console.debug(result);
    return result;
  } catch (error) {
    console.debug(error);
    throw Error(error.response.data);
  }
};

export const fetchLoginStatus = async () => {
  try {
    const result = await AxiosConfig.get('/auth/login/check');
    console.debug(result);
    if (result.status === 200) {
      return result;
    }
    if (result.status === 201) {
      throw Error('세션 만료');
    }
  } catch (error) {
    console.error('fetchLoginERROR !!', error);
  }
};

export const getDetailContent = async (contentType: string, contentId: string) => {
  try {
    const result = await AxiosConfig.get(`content/${contentType}/${contentId}`);
    return result;
  } catch (err) {
    console.debug(err);
  }
};

export const fetchSearchContents = async (
  searchValue: string,
  setSearchContents: Dispatch<SetStateAction<TContent[]>>,
) => {
  if (!searchValue) throw new Error('검색어 입력 필요');
  const result = await AxiosConfig.get(`content/search?search_value=${searchValue}`);
  const contents: TContent[] = result.data.contents;
  setSearchContents(contents);
  return result;
};

export const fetchSearchTvContents = async (
  searchValue: string,
  setSearchContents: Dispatch<SetStateAction<TContent[]>>,
) => {
  if (!searchValue) throw new Error('검색어 입력 필요');
  const result = await AxiosConfig.get(`content/search/tv?search_value=${searchValue}`);
  const contents: TContent[] = result.data.contents;
  setSearchContents(contents);

  return result;
};
export const fetchSearchMovieContents = async (
  searchValue: string,
  setSearchContents: Dispatch<SetStateAction<TContent[]>>,
) => {
  if (!searchValue) throw new Error('검색어 입력 필요');
  const result = await AxiosConfig.get(`content/search/movie?search_value=${searchValue}`);
  const contents: TContent[] = result.data.contents;
  setSearchContents(contents);
  console.table(contents);
  return result;
};
export const reviewCreate = async (reviewCreateDTO: ReviewCreateDTO) => {
  if (reviewCreateDTO.grade === 0) throw new Error('별점 입력 필요');
  if (reviewCreateDTO.lineReview === '') throw new Error('한줄 평 입력 필요');
  try {
    const result = await AxiosConfig.post(
      'review/create',
      { createData: reviewCreateDTO },
      { withCredentials: true },
    );
    console.debug(result);
    return result;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const fetchLatestTvContent = async () => {
  const result = await AxiosConfig.get('tv/latest');
  return result;
};
export const fetchLatestMovieContent = async () => {
  const result = await AxiosConfig.get('movie/latest');
  return result;
};

export const fetchOwnerPickTvContent = async () => {
  const result = await AxiosConfig.get('tv/owner');
  return result;
};
export const fetchOwnerPickMovieContent = async () => {
  const result = await AxiosConfig.get('movie/owner');
  return result;
};
export const fetchTopRatedMovie = async () => {
  const result = await AxiosConfig.get('movie/top-rated-movies');
  return result;
};
