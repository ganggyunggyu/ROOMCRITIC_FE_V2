import React from 'react';
import { useAppSelector } from '../../../shared/store';
import { Content } from '../../../entities';
import { H } from '..';

export const Category = () => {
  const searchContents = useAppSelector((state) => state.search.searchContents);

  return (
    <React.Fragment>
      {searchContents && (
        <Content.U.ContentList title={'최근 검색 결과'} cardList={searchContents} />
      )}
      <Content.U.ContentInfinityList title='인기 짱 작품' query={H.usePopularContentQuery} />
      <Content.U.ContentInfinityList title='개봉 예정 작품' query={H.useLatestContentQuery} />
    </React.Fragment>
  );
};
