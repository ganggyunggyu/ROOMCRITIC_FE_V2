import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../util/cn';
import { VariantProps, cva } from 'class-variance-authority';

import { isDarkModeState } from '../../store/atoms';
import { useRecoilValue } from 'recoil';

export const InputVariants = cva(
  `block py-3 px-0 w-full text-sm bg-transparent border-0 border-b-2
   appearance-none dark:focus:border-violet-400
   focus:outline-none focus:ring-0 focus:border-violet-400 peer`,
  {
    variants: {},
  },
);

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof InputVariants> & {
    label?: string;
    alertMessage?: string;
  };

const Input: React.FC<InputProps> = ({ label, alertMessage, className, ...props }) => {
  const isDarkMode = useRecoilValue(isDarkModeState);
  return (
    <React.Fragment>
      <div className='relative z-0 py-1 w-full'>
        <input
          id='floating_filled'
          placeholder=' '
          autoComplete='off'
          className={cn(InputVariants({ className }), isDarkMode ? 'border-white' : 'border-black')}
          {...props}
        />
        {label && (
          <label
            className='absolute text-md dark:white duration-300
          transform -translate-y-6 scale-75 top-3.5 left-0 -z-10 origin-[0] peer-focus:start-0 
          peer-focus:text-violet-400 peer-focus:dark:text-violet-400 peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 
          rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            htmlFor='floating_filled'
          >
            {label}
          </label>
        )}
      </div>
      {alertMessage && <p className='text-red-400 text-xs transition-1s'>{alertMessage}</p>}
    </React.Fragment>
  );
};

export default Input;
