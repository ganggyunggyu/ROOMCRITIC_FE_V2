import React, { ChangeEvent } from 'react';

const useFormInput = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  
  return { value, setValue, onChange: handleChange };
};

export default useFormInput;
