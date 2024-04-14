import { Dispatch, SetStateAction } from 'react';
import { TContent, TJoinUserDTO, TLoginUserDTO, TReviewCreateDTO } from '../types/main';
import AxiosConfig from './AxiosConfig';

export const submitJoin = async (requestUserInfo: TJoinUserDTO) => {
  try {
    const result = await AxiosConfig.post('/auth/join', {
      email: requestUserInfo.email,
      password: requestUserInfo.password,
      displayName: requestUserInfo.displayName,
      phoneNumber: requestUserInfo.phoneNumber,
    });
    //이메일 또는 패스워드가 중복 되는 경우
    // if (result.status === 201) {
    //   throw new Error(result.data.message);
    // }
    return result;
  } catch (error) {
    console.debug(error);
  }
};
export const submitLogin = async (requestUserInfo: TLoginUserDTO) => {
  try {
    const result = await AxiosConfig.post('/auth/login', requestUserInfo);
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
    // if (result.status === 201) {
    //   throw Error('세션 만료');
    //   // return result
    // }
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
  const result = await AxiosConfig.get(`content/search?search_value=${searchValue}`);
  const contents: TContent[] = result.data.contents;
  setSearchContents(contents);
  return result;
};

export const fetchSearchTvContents = async (
  searchValue: string,
  setSearchContents: Dispatch<SetStateAction<TContent[]>>,
) => {
  const result = await AxiosConfig.get(`content/search/tv?search_value=${searchValue}`);
  const contents: TContent[] = result.data.contents;
  setSearchContents(contents);

  return result;
};
export const fetchSearchMovieContents = async (
  searchValue: string,
  setSearchContents: Dispatch<SetStateAction<TContent[]>>,
) => {
  const result = await AxiosConfig.get(`content/search/movie?search_value=${searchValue}`);
  const contents: TContent[] = result.data.contents;
  setSearchContents(contents);
  console.table(contents);
  return result;
};
export const reviewCreate = async (reviewCreateDTO: TReviewCreateDTO) => {
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
