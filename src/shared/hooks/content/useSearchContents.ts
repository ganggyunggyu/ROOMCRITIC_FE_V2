import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { searchContentsState } from '../../../app/store/atoms';
import * as API from '../../api/API';

const useSearchContents = (searchValue: string) => {
  const setSearchContents = useSetRecoilState(searchContentsState);

  const searchContentsQuery = useQuery({
    queryKey: ['searchContents', searchValue],
    queryFn: () => API.fetchSearchContents(searchValue, setSearchContents),
  });
  const searchTvContentsQuery = useQuery({
    queryKey: ['searchTvContents', searchValue],
    queryFn: () => API.fetchSearchTvContents(searchValue, setSearchContents),
  });
  const searchMovieContentsQuery = useQuery({
    queryKey: ['searchMovieContents', searchValue],
    queryFn: () => API.fetchSearchMovieContents(searchValue, setSearchContents),
  });

  return { searchContentsQuery, searchTvContentsQuery, searchMovieContentsQuery };
};

export default useSearchContents;
