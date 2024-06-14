import { TMDB_TOKEN } from '../../../config/env-config';
import { axiosConfig } from '../../../shared/api/axios-config';

export const getContentByOne = async (contentId: string) => {
  try {
    const result = await axiosConfig.get(`content/${contentId}`);
    return result;
  } catch (err) {
    console.debug(err);
  }
};

export const getSearchContent = async (searchValue: string, contentType?: string) => {
  if (!searchValue) throw new Error('검색어 입력 필요');
  if (searchValue.length <= 1) throw new Error('검색어 입력 필요');
  const result = await axiosConfig.get(`content/?q=${searchValue}&content_type=${contentType}`);
  return result;
};

export const getLatestContent = async (pageParam: number, contentType?: string) => {
  const url = contentType
    ? `content/latest?skip=${pageParam}&content_type=${contentType}`
    : `content/latest?skip=${pageParam}`;
  const result = await axiosConfig.get(url);

  return result.data;
};

export const getPopularContent = async (pageParam: number, contentType?: string) => {
  const url = contentType
    ? `content/popular?skip=${pageParam}&content_type=${contentType}`
    : `content/popular?skip=${pageParam}`;

  const result = await axiosConfig.get(url);

  return result.data;
};

export const getVideo = async (type: string, id: number) => {
  const option = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TMDB_TOKEN,
    },
  };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 100);
  try {
    clearTimeout(timeoutId);
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos`, {
      ...option,
      signal: AbortSignal.timeout(500),
    });

    if (!response.ok) {
      throw new Error('네트워크 통신 에러');
    }
    const data = await response.json();
    console.log(data);
    if (data.results.length === 0) throw Error('비디오 정보 없음');

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    throw new Error('네트워크 통신 에러');
  }
};
