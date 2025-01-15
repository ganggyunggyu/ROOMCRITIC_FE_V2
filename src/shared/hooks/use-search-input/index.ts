import React, { ChangeEvent } from 'react';

export type TypeNumber = 0 | 1 | 2;

export const getContentType = (typeNumber: TypeNumber) => {
  if (typeNumber === 0) return 'all';
  if (typeNumber === 1) return 'movie';
  if (typeNumber === 2) return 'tv';
};

export const useSearchInput = (
  initialValue: string,
  initalType: TypeNumber,
) => {
  const [value, setValue] = React.useState(initialValue);
  const type = initalType;
  const typeName = getContentType(initalType);
  const isEmpty = value.length === 0;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return { value, type, typeName, setValue, isEmpty, onChange: handleChange };
};
