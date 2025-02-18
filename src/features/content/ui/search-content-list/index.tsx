import React from 'react';
import { Loading } from '../../../../shared/ui/loading';
import { ContentList } from '../content-list';

export function SearchContents({ isActive, isLoading, contents }) {
  if (isActive)
    return (
      <React.Fragment>
        <p className="pt-14 text-8xl animate-bounce pointer-events-none">👆</p>
        <p className="text-xl">원하는 작품을 검색해보세요!</p>
      </React.Fragment>
    );
  if (isLoading) return <Loading />;

  return <ContentList title={'검색 결과'} cardList={contents} />;
}
