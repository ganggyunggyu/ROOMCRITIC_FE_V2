import { useRecoilValue } from 'recoil';
import { isLoggedInState, searchContentsState } from '../store/atoms';
import CardWrapProvider from './WrapProvider/CardWrapProvider';

import Loading from './Loading';
import axiosConfig from '../api/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import ResponsiveProvider from './WrapProvider/ResponsiveProvider';

const fetchLatestTvContent = async () => {
  const result = await axiosConfig.get('tv/latest');
  return result;
};
const fetchLatestMovieContent = async () => {
  const result = await axiosConfig.get('movie/latest');
  return result;
};

const fetchOwnerPickTvContent = async () => {
  const result = await axiosConfig.get('tv/owner');
  return result;
};
const fetchOwnerPickMovieContent = async () => {
  const result = await axiosConfig.get('movie/owner');
  return result;
};
const fetchTopRatedMovie = async () => {
  const result = await axiosConfig.get('movie/top-rated-movies');
  return result;
};

const CategoryReviewList = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const searchContents = useRecoilValue(searchContentsState);

  const latestTvContentQuery = useQuery({
    queryKey: ['latestTvContent'],
    queryFn: fetchLatestTvContent,
  });
  const latestMovieContentQuery = useQuery({
    queryKey: ['latestMovieContent'],
    queryFn: fetchLatestMovieContent,
  });

  const ownerPickMovieQuery = useQuery({
    queryKey: ['ownerMovieContent'],
    queryFn: fetchOwnerPickMovieContent,
  });

  const ownerPickTvQuery = useQuery({
    queryKey: ['ownerTvContent'],
    queryFn: fetchOwnerPickTvContent,
  });
  const topRatedMovieQuery = useQuery({
    queryKey: ['topRatedMovie'],
    queryFn: fetchTopRatedMovie,
  });

  const { isLoading: isLatestMovieLoading, data: latestMovieData } = latestMovieContentQuery;
  const { isLoading: isLatestTvLoading, data: latestTvData } = latestTvContentQuery;
  const { isLoading: isOwnerPickMovieLoading, data: ownerPickMovieData } = ownerPickMovieQuery;
  const { isLoading: isOwnerPickTvLoading, data: ownerPickTvData } = ownerPickTvQuery;
  const { isLoading: isTopRatedMovieLoading, data: topRatedMovieData } = topRatedMovieQuery;

  if (
    isLatestMovieLoading &&
    isLatestTvLoading &&
    isOwnerPickMovieLoading &&
    isOwnerPickTvLoading &&
    isTopRatedMovieLoading &&
    !searchContents
  ) {
    return <Loading />;
  }

  if (
    !isLatestMovieLoading &&
    !isLatestTvLoading &&
    !isOwnerPickMovieLoading &&
    !isOwnerPickTvLoading &&
    !isTopRatedMovieLoading &&
    searchContents
  ) {
    const latestMovies = latestMovieData?.data?.movies || [];
    const latestTvs = latestTvData?.data?.tvs || [];
    const ownerMovies = ownerPickMovieData?.data?.movies || [];
    const ownerTvs = ownerPickTvData?.data?.tvs || [];
    const topRatedMovies = topRatedMovieData?.data?.movies || [];

    return (
      <ResponsiveProvider direction={'col'}>
        {isLoggedIn && searchContents.length !== 0 && (
          <CardWrapProvider title={'최근 검색 결과'} cardList={searchContents} />
        )}
        {ownerMovies && ownerTvs && (
          <CardWrapProvider
            title={'주인장 선정 작품입니다!'}
            cardList={[...ownerMovies, ...ownerTvs]}
          />
        )}

        {latestMovies && (
          <CardWrapProvider title={'최근에 평론을 받은 영화에요!'} cardList={latestMovies} />
        )}
        {latestTvs && (
          <CardWrapProvider title={'최근에 평론을 받은 프로그램이에요!'} cardList={latestTvs} />
        )}
        {topRatedMovies && (
          <CardWrapProvider title={'길이 남을 명작들을 가져왔어요'} cardList={topRatedMovies} />
        )}
      </ResponsiveProvider>
    );
  }
};
export default CategoryReviewList;
