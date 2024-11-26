import React from 'react';
import { useAppSelector } from '../../../shared/store';
import { Content, useLatestContentQuery, usePopularContentQuery } from '../../../entities';
import { ContentList } from './ContentList';
import { ContentInfinityList } from './ContentInfinityList';

export const Category = () => {
  const searchContents = useAppSelector((state) => state.search.searchContents);

  return (
    <React.Fragment>
      {searchContents && <ContentList title={'최근 검색 결과'} cardList={searchContents} />}
      <ContentInfinityList title="명작 모음" query={usePopularContentQuery} />
      <ContentInfinityList title="개봉 예정 작품" query={useLatestContentQuery} />
    </React.Fragment>
  );
};
