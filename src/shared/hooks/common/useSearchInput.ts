import React, { ChangeEvent } from 'react';

const useSearchInput = (initialValue: string, initalType: number) => {
  //0 전체 검색
  //1 영화
  //2 TV
  const [value, setValue] = React.useState(initialValue);
  const type = initalType;
  const isEmpty = value.length === 0;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return { value, type, setValue, isEmpty, onChange: handleChange };
};

export default useSearchInput;
