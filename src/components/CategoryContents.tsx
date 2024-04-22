import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { searchContentsState } from '../app/store/atoms';
import ResponsiveProvider from './wrap-provider/ResponsiveProvider';
import CardWrapProvider from './wrap-provider/CardWrapProvider';
import Loading from './Loading';
import * as API from '../shared/api/API';

const CategoryContents = () => {
  const searchContents = useRecoilValue(searchContentsState);

  const latestTvContentQuery = useQuery({
    queryKey: ['latestTvContent'],
    queryFn: API.fetchLatestTvContent,
  });
  const latestMovieContentQuery = useQuery({
    queryKey: ['latestMovieContent'],
    queryFn: API.fetchLatestMovieContent,
  });

  const ownerPickMovieQuery = useQuery({
    queryKey: ['ownerMovieContent'],
    queryFn: API.fetchOwnerPickMovieContent,
  });

  const ownerPickTvQuery = useQuery({
    queryKey: ['ownerTvContent'],
    queryFn: API.fetchOwnerPickTvContent,
  });
  const topRatedMovieQuery = useQuery({
    queryKey: ['topRatedMovie'],
    queryFn: API.fetchTopRatedMovie,
  });

  const { isLoading: isLatestMovieLoading, data: latestMovieData } = latestMovieContentQuery;
  const { isLoading: isLatestTvLoading, data: latestTvData } = latestTvContentQuery;
  const { isLoading: isOwnerPickMovieLoading, data: ownerPickMovieData } = ownerPickMovieQuery;
  const { isLoading: isOwnerPickTvLoading, data: ownerPickTvData } = ownerPickTvQuery;
  const { isLoading: isTopRatedMovieLoading, data: topRatedMovieData } = topRatedMovieQuery;

  const isTotalLoading =
    isLatestMovieLoading &&
    isLatestTvLoading &&
    isOwnerPickMovieLoading &&
    isOwnerPickTvLoading &&
    isTopRatedMovieLoading &&
    !searchContents;

  if (isTotalLoading) {
    return <Loading />;
  }

  if (!isTotalLoading) {
    const latestMovies = latestMovieData?.data?.movies;
    const latestTvs = latestTvData?.data?.tvs;
    const ownerMovies = ownerPickMovieData?.data?.movies;
    const ownerTvs = ownerPickTvData?.data?.tvs;
    const topRatedMovies = topRatedMovieData?.data?.movies;

    return (
      <ResponsiveProvider direction={'col'}>
        {searchContents.length > 0 && (
          <CardWrapProvider title={'최근 검색 결과'} cardList={searchContents} />
        )}
        {ownerMovies && (
          <CardWrapProvider title={'주인장 선정 작품입니다!'} cardList={ownerMovies} />
        )}
        {ownerTvs && <CardWrapProvider title={'주인장 선정 작품입니다!'} cardList={ownerTvs} />}

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
  return <Loading />;
};
export default CategoryContents;
