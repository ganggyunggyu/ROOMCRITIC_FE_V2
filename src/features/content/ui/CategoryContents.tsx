import React from 'react';
import { useAppSelector } from '../../../app/store';
import CardWrapProvider from '../../../entities/wrap-provider/CardWrapProvider';
import CardInfinityProvider from './CardInfinityProvider';
import { useLatestContentQuery, usePopularContentQuery } from '../api/hooks';

const CategoryContents = () => {
  const searchContents = useAppSelector((state) => state.search.searchContents);

  return (
    <React.Fragment>
      {searchContents && <CardWrapProvider title={'최근 검색 결과'} cardList={searchContents} />}
      <CardInfinityProvider title='인기 짱 작품' query={usePopularContentQuery} />
      <CardInfinityProvider title='개봉 예정 작품' query={useLatestContentQuery} />
    </React.Fragment>
  );
};

export default CategoryContents;
