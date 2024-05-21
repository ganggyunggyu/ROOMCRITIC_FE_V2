import { useQuery } from '@tanstack/react-query';
import * as API from '../../api/api';

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
  const { isLoading: isLatestTvLoading, data: LatestTv } = latestTvContentQuery;
  const { isLoading: isOwnerTvLoading, data: OwnerTv } = ownerPickTvQuery;

  const { isLoading: isLatestMovieLoading, data: LatestMovie } = latestMovieContentQuery;
  const { isLoading: isOwnerMovieLoading, data: OwnerMovie } = ownerPickMovieQuery;

  const isLoadingArray = [
    isLatestTvLoading,
    isOwnerTvLoading,
    isLatestMovieLoading,
    isOwnerMovieLoading,
  ];

  const checkAllLoadings = () => {
    return isLoadingArray.every((isLoading) => !isLoading);
  };

  const isSuccess = checkAllLoadings();

  return { isSuccess, LatestTv, OwnerTv, LatestMovie, OwnerMovie };
};

export default useCategoryContentFetch;
