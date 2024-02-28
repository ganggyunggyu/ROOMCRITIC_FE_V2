import React from 'react';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SetValueFunction<T> = React.Dispatch<React.SetStateAction<T>>;

type TInputHandler = {
  event: InputChangeEvent;
  setValue: SetValueFunction<string>;
};

export const inputHandler = ({ event, setValue }: TInputHandler): void => {
  setValue(event.target.value);
};
export const phoneNumberHandler = ({ event, setValue }: TInputHandler): void => {
  setValue(
    event.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(\{1,2})$/g, ''),
  );
};
