import { useAppSelector } from '../app/store';
import useCategoryContentFetch from '../shared/hooks/content/useCategoryContent';
import ResponsiveProvider from './wrap-provider/ResponsiveProvider';
import CardWrapProvider from './wrap-provider/CardWrapProvider';
import Loading from './Loading';

const CategoryContents = () => {
  const searchContents = useAppSelector((state) => state.search.searchContents);
  const isSearchContentEmpty = searchContents.length === 0;

  const { isSucess, OwnerMovie, OwnerTv, TopMovie, LatestMovie, LatestTv } =
    useCategoryContentFetch();
  if (!isSucess) {
    return <Loading />;
  }
  if (isSucess) {
    const ownerMovie = OwnerMovie.movies;
    const ownerTv = OwnerTv.tvs;
    const topMovie = TopMovie.movies;
    const latestMovie = LatestMovie.movies;
    const latestTv = LatestTv.tvs;
    return (
      <ResponsiveProvider direction={'col'}>
        {!isSearchContentEmpty && (
          <CardWrapProvider title={'최근 검색 결과'} cardList={searchContents} />
        )}
        <CardWrapProvider title={'주인장 선정 작품입니다!'} cardList={ownerMovie} />
        <CardWrapProvider title={'주인장 선정 작품입니다!'} cardList={ownerTv} />
        <CardWrapProvider title={'최근에 평론을 받은 영화에요!'} cardList={latestMovie} />
        <CardWrapProvider title={'최근에 평론을 받은 프로그램이에요!'} cardList={latestTv} />
        <CardWrapProvider title={'길이 남을 명작들을 가져왔어요'} cardList={topMovie} />
      </ResponsiveProvider>
    );
  }
};

export default CategoryContents;
