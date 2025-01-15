import React from 'react';
import { SEARCH_INPUT, SEARCH_BUTTON } from '@public/constant/SEARCH_LABEL';
import { ResponsiveProvider } from '@/widgets';
import {
  SearchInput,
  SearchButton,
  SearchContents,
  AuthError,
} from '@/features';
import { useSearchContentQuery } from '@/entities';
import { TypeNumber } from '@/shared';

export default function Serch() {
  const [searchValue, setSearchValue] = React.useState('');
  const [searchType, setSearchType] = React.useState<TypeNumber>(0); //0 전체 1 영화 2 티비
  const [prevType, setPrevType] = React.useState(searchType);

  const { searchInput, searchContents } = useSearchContentQuery(searchType);

  const SearchButtons = [
    {
      label: SEARCH_BUTTON[0],
      isActive: searchType === 0,
      onClick: () => setSearchType(0),
    },
    {
      label: SEARCH_BUTTON[1],
      isActive: searchType === 1,
      onClick: () => setSearchType(1),
    },
    {
      label: SEARCH_BUTTON[2],
      isActive: searchType === 2,
      onClick: () => setSearchType(2),
    },
  ];

  React.useEffect(() => {
    const value = searchInput.value;
    setSearchValue(value);
  }, [searchInput.value]);

  if (prevType !== searchType) {
    setPrevType(searchType);
    const value = searchValue;
    searchInput.setValue(value);
  }

  const SearchConfig = [
    {
      label: SEARCH_INPUT[0],
      value: searchInput.value,
      onChange: searchInput.onChange,
      type: searchInput.type,
      isActive: searchInput.isEmpty,
      isLoading: searchContents.isLoading,
      contents: searchContents.data,
    },
    {
      label: SEARCH_INPUT[1],
      value: searchInput.value,
      onChange: searchInput.onChange,
      type: searchInput.type,
      isActive: searchInput.isEmpty,
      isLoading: searchContents.isLoading,
      contents: searchContents.data,
    },
    {
      label: SEARCH_INPUT[2],
      value: searchInput.value,
      onChange: searchInput.onChange,
      type: searchInput.type,
      isActive: searchInput.isEmpty,
      isLoading: searchContents.isLoading,
      contents: searchContents.data,
    },
  ];

  return (
    <AuthError>
      <ResponsiveProvider direction={'col'} className={'gap-5 pt-10'}>
        <div className="flex gap-3 w-2/3">
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
        {SearchConfig.map((searchConfig, index) => {
          return (
            searchType === index && (
              <React.Fragment key={index}>
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
    </AuthError>
  );
}
