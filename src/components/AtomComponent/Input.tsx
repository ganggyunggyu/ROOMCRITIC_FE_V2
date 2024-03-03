import React, { InputHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '../../util/cn';
import { VariantProps, cva } from 'class-variance-authority';
import Button, { ButtonVariants } from './Button';
import { isDarkModeState } from '../../store/atoms';
import { useRecoilValue } from 'recoil';

export const InputVariants = cva(
  // `p-2 text-sm md:text-md block rounded-md border-0 text-gray-900 shadow-sm ring-1
  // ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
  // focus:ring-violet-600 focus:bg-slate-50 transition-1s w-full`,
  `block py-3 px-0 w-full text-sm bg-transparent border-0 border-b-2
   appearance-none dark:focus:border-violet-400
   focus:outline-none focus:ring-0 focus:border-violet-400 peer`,
  {
    variants: {},
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof ButtonVariants> & {
    label?: string;
    item?: React.ReactElement;
    bg?: string;
    // text?: string;
    // onClick: MouseEvent<HTMLButtonElement, MouseEvent>; // 변경된 타입
    // onClick: () => void;
  };

// const mutate: UseMutateFunction<AxiosResponse<any, any> | undefined, Error, void, unknown>

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof InputVariants> & {
    label?: string;
    alertMessage?: string;
    buttonConfig?: ButtonProps;
  };

// className={cn(ButtonVariants({ bg, text }))}
const Input: React.FC<InputProps> = ({
  label,
  alertMessage,
  className,
  buttonConfig,
  ...props
}) => {
  const isDarkMode = useRecoilValue(isDarkModeState);
  return (
    <React.Fragment>
      <div className='relative z-0 py-1 w-full mt-5'>
        <input
          id='floating_filled pt-1'
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
        {buttonConfig && (
          <Button
            className={'absolute top-3 right-0'}
            label={buttonConfig.label}
            bg={buttonConfig.bg}
            onClick={buttonConfig.onClick}
          />
        )}
      </div>
      {alertMessage && <p className='text-red-400 text-xs transition-1s'>{alertMessage}</p>}
    </React.Fragment>
  );
};

export default Input;
