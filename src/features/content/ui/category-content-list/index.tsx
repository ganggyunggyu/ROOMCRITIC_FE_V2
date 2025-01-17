import React from 'react';
import { useAppSelector } from '@/app/store';
import {
  useLatestContentQuery,
  usePopularContentQuery,
  useRecentlyCreateReviewContent,
} from '@/entities';
import { ContentInfinityList } from '../content-infinity-list';
import { ContentList } from '../content-list';

export const Category = () => {
  const searchContents = useAppSelector((state) => state.search.searchContents);

  return (
    <React.Fragment>
      {searchContents?.length !== 0 && (
        <ContentList title={'최근 검색 결과'} cardList={searchContents} />
      )}
      <ContentInfinityList
        title="최근에 리뷰가 작성된 작품들"
        query={useRecentlyCreateReviewContent}
      />
      <ContentInfinityList title="명작 모음" query={usePopularContentQuery} />
      <ContentInfinityList
        title="개봉 예정 작품들"
        query={useLatestContentQuery}
      />
    </React.Fragment>
  );
};
