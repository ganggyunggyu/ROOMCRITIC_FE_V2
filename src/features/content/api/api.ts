import { axiosConfig } from '../../../test/axios-config';

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
