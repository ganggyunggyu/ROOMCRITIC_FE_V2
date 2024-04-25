import React from 'react';
import ResponsiveProvider from '../components/wrap-provider/ResponsiveProvider';
import useSearchContents from '../shared/hooks/content/useSearchContents';
import SearchInput from '../components/search/SearchInput';
import SearchContents from '../components/search/SearchContents';
import SearchButton from '../components/search/SearchButton';

export default function Serch() {
  // const searchRef = React.useRef(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchType, setSearchType] = React.useState(0); //0 전체 1 영화 2 티비
  const [prevType, setPrevType] = React.useState(searchType);

  const {
    searchContentsQuery,
    searchMovieContentsQuery,
    searchTvContentsQuery,
    contentSearchInput,
    movieSearchInput,
    tvSearchInput,
  } = useSearchContents(searchType);

  const { isLoading: isContentsLoading, data: contents } = searchContentsQuery;
  const { isLoading: isMoviesLoading, data: movies } = searchMovieContentsQuery;
  const { isLoading: isTvsLoading, data: tvs } = searchTvContentsQuery;

  const SearchButtons = [
    { label: '전체 검색', isActive: searchType === 0, onClick: () => setSearchType(0) },
    { label: '영화 검색', isActive: searchType === 1, onClick: () => setSearchType(1) },
    { label: 'TV 검색', isActive: searchType === 2, onClick: () => setSearchType(2) },
  ];

  React.useEffect(() => {
    setSearchValue(contentSearchInput.value);
  }, [contentSearchInput.value]);
  React.useEffect(() => {
    setSearchValue(movieSearchInput.value);
  }, [movieSearchInput.value]);
  React.useEffect(() => {
    setSearchValue(tvSearchInput.value);
  }, [tvSearchInput.value]);

  if (prevType !== searchType) {
    setPrevType(searchType);
    const value = searchValue;
    if (searchType === 0) contentSearchInput.setValue(value);
    if (searchType === 1) movieSearchInput.setValue(value);
    if (searchType === 2) tvSearchInput.setValue(value);
  }

  return (
    <ResponsiveProvider direction={'col'} className={'gap-5'}>
      <div className='flex gap-3 w-2/3'>
        {SearchButtons.map((buttonConfig) => {
          return (
            <SearchButton
              key={buttonConfig.label}
              label={buttonConfig.label}
              isActive={buttonConfig.isActive}
              onClick={buttonConfig.onClick}
            />
          );
        })}
      </div>
      {searchType === contentSearchInput.type && (
        <React.Fragment>
          <SearchInput
            label={'영화 & TV프로그램 검색'}
            value={contentSearchInput.value}
            onChange={contentSearchInput.onChange}
          />
          <SearchContents
            isActive={contentSearchInput.isEmpty}
            isLoading={isContentsLoading}
            contents={contents}
          />
        </React.Fragment>
      )}
      {searchType === movieSearchInput.type && (
        <React.Fragment>
          <SearchInput
            label={'영화 검색'}
            value={movieSearchInput.value}
            onChange={movieSearchInput.onChange}
          />
          <SearchContents
            isActive={movieSearchInput.isEmpty}
            isLoading={isMoviesLoading}
            contents={movies}
          />
        </React.Fragment>
      )}
      {searchType === tvSearchInput.type && (
        <React.Fragment>
          <SearchInput
            label={'TV프로그램 검색'}
            value={tvSearchInput.value}
            onChange={tvSearchInput.onChange}
          />
          <SearchContents
            isActive={tvSearchInput.isEmpty}
            isLoading={isTvsLoading}
            contents={tvs}
          />
        </React.Fragment>
      )}
    </ResponsiveProvider>
  );
}
