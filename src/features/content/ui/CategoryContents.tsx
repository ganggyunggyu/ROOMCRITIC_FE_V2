import React from 'react';
import { useAppSelector } from '../../../app/store';
import useCategoryContentFetch from '../../../shared/hooks/content/useCategoryContent';
import CardWrapProvider from '../../../entities/wrap-provider/CardWrapProvider';
import CardInfinityProvider from '../../../entities/wrap-provider/CardInfinityProvider';

const CategoryContents = () => {
  const searchContents = useAppSelector((state) => state.search.searchContents);
  const isSearchContentEmpty = searchContents.length === 0;

  const { isSuccess, OwnerMovie, OwnerTv, LatestMovie, LatestTv } = useCategoryContentFetch();
  if (!isSuccess) return <div />;

  return (
    <React.Fragment>
      {!isSearchContentEmpty && (
        <CardWrapProvider title={'최근 검색 결과'} cardList={searchContents} />
      )}
      <CardWrapProvider title={'주인장 선정 작품입니다!'} cardList={OwnerMovie.movies} />
      <CardWrapProvider title={'주인장 선정 작품입니다!'} cardList={OwnerTv.tvs} />
      <CardWrapProvider title={'최근에 평론을 받은 영화에요!'} cardList={LatestMovie.movies} />
      <CardWrapProvider title={'최근에 평론을 받은 프로그램이에요!'} cardList={LatestTv.tvs} />
      <CardInfinityProvider title='길이 남을 명작들을 가져왔어요' />
    </React.Fragment>
  );
};

export default CategoryContents;
