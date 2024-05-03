import React from 'react';
import ResponsiveProvider from '../entities/wrap-provider/ResponsiveProvider';
import useSearchContents from '../shared/hooks/content/useSearchContents';
import SearchInput from '../entities/search/SearchInput';
import SearchContents from '../entities/search/SearchContents';
import SearchButton from '../entities/search/SearchButton';
import { SEARCH_INPUT, SEARCH_BUTTON } from '../../public/constant/SEARCH_LABEL';
export default function Serch() {
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
    { label: SEARCH_BUTTON[0], isActive: searchType === 0, onClick: () => setSearchType(0) },
    { label: SEARCH_BUTTON[1], isActive: searchType === 1, onClick: () => setSearchType(1) },
    { label: SEARCH_BUTTON[2], isActive: searchType === 2, onClick: () => setSearchType(2) },
  ];

  React.useEffect(() => {
    const value = contentSearchInput.value;
    setSearchValue(value);
  }, [contentSearchInput.value]);

  React.useEffect(() => {
    const value = movieSearchInput.value;
    setSearchValue(value);
  }, [movieSearchInput.value]);

  React.useEffect(() => {
    const value = tvSearchInput.value;
    setSearchValue(value);
  }, [tvSearchInput.value]);

  if (prevType !== searchType) {
    setPrevType(searchType);
    const value = searchValue;
    if (searchType === 0) contentSearchInput.setValue(value);
    if (searchType === 1) movieSearchInput.setValue(value);
    if (searchType === 2) tvSearchInput.setValue(value);
  }

  const SearchConfig = [
    {
      label: SEARCH_INPUT[0],
      value: contentSearchInput.value,
      onChange: contentSearchInput.onChange,
      type: contentSearchInput.type,
      isActive: contentSearchInput.isEmpty,
      isLoading: isContentsLoading,
      contents: contents,
    },
    {
      label: SEARCH_INPUT[1],
      value: movieSearchInput.value,
      onChange: movieSearchInput.onChange,
      type: movieSearchInput.type,
      isActive: movieSearchInput.isEmpty,
      isLoading: isMoviesLoading,
      contents: movies,
    },
    {
      label: SEARCH_INPUT[2],
      value: tvSearchInput.value,
      onChange: tvSearchInput.onChange,
      type: tvSearchInput.type,
      isActive: tvSearchInput.isEmpty,
      isLoading: isTvsLoading,
      contents: tvs,
    },
  ];

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
      {SearchConfig.map((searchConfig) => {
        return (
          searchType === searchConfig.type && (
            <React.Fragment key={searchConfig.type}>
              <SearchInput
                label={searchConfig.label}
                value={searchConfig.value}
                onChange={searchConfig.onChange}
              />
              <SearchContents
                isActive={searchConfig.isActive}
                isLoading={searchConfig.isLoading}
                contents={searchConfig.contents}
              />
            </React.Fragment>
          )
        );
      })}
    </ResponsiveProvider>
  );
}
