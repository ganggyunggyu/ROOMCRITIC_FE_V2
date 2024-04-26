import { useQuery } from '@tanstack/react-query';
import * as API from '../../api/API';

const useCategoryContentFetch = () => {
  const latestTvContentQuery = useQuery({
    queryKey: ['latestTvContent'],
    queryFn: API.fetchLatestTvContents,
    select: (data) => data.data,
  });
  const ownerPickTvQuery = useQuery({
    queryKey: ['ownerTvContent'],
    queryFn: API.fetchOwnerPickedTvContents,
    select: (data) => data.data,
  });
  const latestMovieContentQuery = useQuery({
    queryKey: ['latestMovieContent'],
    queryFn: API.fetchLatestMovieContents,
    select: (data) => data.data,
  });

  const ownerPickMovieQuery = useQuery({
    queryKey: ['ownerMovieContent'],
    queryFn: API.fetchOwnerPickedMovieContents,
    select: (data) => data.data,
  });

  const topRatedMovieQuery = useQuery({
    queryKey: ['topRatedMovie'],
    queryFn: API.fetchTopRatedMovies,
    select: (data) => data.data,
  });
  const { isLoading: isLatestTvLoading, data: LatestTv } = latestTvContentQuery;
  const { isLoading: isOwnerTvLoading, data: OwnerTv } = ownerPickTvQuery;

  const { isLoading: isLatestMovieLoading, data: LatestMovie } = latestMovieContentQuery;
  const { isLoading: isOwnerMovieLoading, data: OwnerMovie } = ownerPickMovieQuery;
  const { isLoading: isTopMovieLoading, data: TopMovie } = topRatedMovieQuery;

  const isLoadingArray = [
    isLatestTvLoading,
    isOwnerTvLoading,
    isLatestMovieLoading,
    isOwnerMovieLoading,
    isTopMovieLoading,
  ];

  const checkAllLoadings = () => {
    return isLoadingArray.every((isLoading) => !isLoading);
  };

  const isSucess = checkAllLoadings();

  return { isSucess, LatestTv, OwnerTv, LatestMovie, OwnerMovie, TopMovie };
};

export default useCategoryContentFetch;
