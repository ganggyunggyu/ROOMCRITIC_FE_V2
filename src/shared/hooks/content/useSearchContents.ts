import { useQuery } from '@tanstack/react-query';
import * as API from '../../api/API';
import { useAppDispatch } from '../../../app/store';
import { setSearchContents } from '../../../app/store/slice/searchSlice';
import useSearchInput from '../common/useSearchInput';

const useSearchContents = (searchType: number) => {
  const dispatch = useAppDispatch();
  const contentSearchInput = useSearchInput('', 0);
  const movieSearchInput = useSearchInput('', 1);
  const tvSearchInput = useSearchInput('', 2);

  const searchContentsQuery = useQuery({
    queryKey: ['searchContents', contentSearchInput.value],
    queryFn: () => {
      if (searchType === 0) {
        if (!contentSearchInput.value) return null;
        return API.fetchSearchedContent(contentSearchInput.value);
      }
    },
    select: (data) => {
      if (searchType === 0) {
        dispatch(setSearchContents(data.data.contents));
      }
      return data.data.contents;
    },
  });
  const searchMovieContentsQuery = useQuery({
    queryKey: ['searchMovieContents', movieSearchInput.value],
    queryFn: () => {
      if (!movieSearchInput.value) return null;
      if (searchType === 1 && movieSearchInput.value) {
        return API.fetchSearchedMovieContent(movieSearchInput.value);
      }
    },
    select: (data) => {
      if (searchType === 1) {
        dispatch(setSearchContents(data.data.contents));
      }
      return data.data.contents;
    },
  });
  const searchTvContentsQuery = useQuery({
    queryKey: ['searchTvContents', tvSearchInput.value],
    queryFn: () => {
      if (!tvSearchInput.value) return null;
      if (searchType === 2) {
        return API.fetchSearchedTvContent(tvSearchInput.value);
      }
    },
    select: (data) => {
      if (searchType === 2) {
        dispatch(setSearchContents(data.data.contents));
      }
      return data.data.contents;
    },
  });

  return {
    searchContentsQuery,
    searchTvContentsQuery,
    searchMovieContentsQuery,
    contentSearchInput,
    movieSearchInput,
    tvSearchInput,
  };
};

export default useSearchContents;
