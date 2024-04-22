import CardWrapProvider from '../components/WrapProvider/CardWrapProvider';
import React, { useState } from 'react';

import Input from '../components/AtomComponent/Input';
import Button from '../components/AtomComponent/Button';
import ResponsiveProvider from '../components/WrapProvider/ResponsiveProvider';
import useSearchContents from '../hooks/content/useSearchContents';
import Loading from '../components/Loading';
export default function Serch() {
  const [searchValue, setSerchValue] = useState('');
  const [searchType, setSearchType] = useState(0);
  //0 전체 1 영화 2 티비
  const { searchContentsQuery, searchMovieContentsQuery, searchTvContentsQuery } =
    useSearchContents(searchValue);
  const isSearchValue = searchValue.length === 0;

  return (
    <ResponsiveProvider direction={'col'} className={'gap-5'}>
      <div className='flex gap-3 w-2/3'>
        <Button
          label={'전체 검색'}
          bg={searchType === 0 ? 'main' : 'default'}
          onClick={() => setSearchType(0)}
        />
        <Button
          label={'영화 검색'}
          bg={searchType === 1 ? 'main' : 'default'}
          onClick={() => setSearchType(1)}
        />
        <Button
          label={'TV 검색'}
          bg={searchType === 2 ? 'main' : 'default'}
          onClick={() => setSearchType(2)}
        />
      </div>
      <div className='w-2/3 relative'>
        {searchType === 0 && (
          <Input
            label={'영화 & TV프로그램 검색'}
            value={searchValue}
            onChange={(e) => {
              setSerchValue(e.target.value);
            }}
            name={'search'}
            className='w-full'
          />
        )}
        {searchType === 1 && (
          <Input
            label={'영화 검색'}
            value={searchValue}
            onChange={(e) => {
              setSerchValue(e.target.value);
            }}
            // name={'search'}
            className='w-full'
          />
        )}
        {searchType === 2 && (
          <Input
            label={'TV 프로그램 검색'}
            value={searchValue}
            onChange={(e) => {
              setSerchValue(e.target.value);
            }}
            name={'search'}
            className='w-full'
          />
        )}
      </div>
      {isSearchValue ? (
        <React.Fragment>
          <p className='pt-14 text-8xl animate-bounce pointer-events-none'>👆</p>
          <p className='text-xl'>원하는 작품을 검색해보세요!</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {searchContentsQuery.isLoading ||
          searchMovieContentsQuery.isLoading ||
          searchTvContentsQuery.isLoading ? (
            <Loading />
          ) : (
            <CardWrapProvider
              title={'검색 결과'}
              cardList={
                searchType === 0
                  ? searchContentsQuery.data?.data.contents // searchType이 0일 때의 데이터
                  : searchType === 1
                  ? searchMovieContentsQuery.data?.data.contents // searchType이 1일 때의 데이터
                  : searchType === 2
                  ? searchTvContentsQuery.data?.data.contents // searchType이 2일 때의 데이터
                  : [] // 기본값
              }
            />
          )}
        </React.Fragment>
      )}
    </ResponsiveProvider>
  );
}
