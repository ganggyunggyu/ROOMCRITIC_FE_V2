import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { searchContentsState } from '../../store/atoms';

import axiosConfig from '../../api/AxiosConfig';

const useSearchContents = (searchValue: string) => {
  const setSerchContents = useSetRecoilState(searchContentsState);

  const fetchSearchContents = async () => {
    const result = await axiosConfig.get(`content/search?search_value=${searchValue}`);

    setSerchContents(result.data.contents);
    return result;
  };
  const fetchSearchTvContents = async () => {
    const result = await axiosConfig.get(`content/search/tv?search_value=${searchValue}`);

    setSerchContents(result.data.contents);
    return result;
  };
  const fetchSearchMovieContents = async () => {
    const result = await axiosConfig.get(`content/search/movie?search_value=${searchValue}`);

    setSerchContents(result.data.contents);
    return result;
  };

  const searchContentsQuery = useQuery({
    queryKey: ['searchContents', searchValue],
    queryFn: fetchSearchContents,
  });
  const searchTvContentsQuery = useQuery({
    queryKey: ['searchTvContents', searchValue],
    queryFn: fetchSearchTvContents,
  });
  const searchMovieContentsQuery = useQuery({
    queryKey: ['searchMovieContents', searchValue],
    queryFn: fetchSearchMovieContents,
  });

  return { searchContentsQuery, searchTvContentsQuery, searchMovieContentsQuery };
};

export default useSearchContents;
