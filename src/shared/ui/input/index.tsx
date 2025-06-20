import React, { InputHTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';

const InputVariants = cva(
  `block py-3 px-0 w-full text-sm bg-transparent border-0 border-b-2
   appearance-none dark:focus:border-zinc-700
   focus:outline-none focus:ring-0 focus:border-violet-400 peer`,
  {
    variants: {},
  },
);

const InputLabelVariants = cva(
  `absolute text-md dark:white duration-300
  transform -translate-y-6 scale-75 top-3.5 left-0 -z-10 origin-[0] peer-focus:start-0 
  peer-focus:text-zinc-700 peer-focus:dark:text-zinc-700 peer-placeholder-shown:scale-100 
  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 
  rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`,
);

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof InputVariants> & {
    label?: string;
    alertMessage?: string;
  };

export const Input: React.FC<InputProps> = ({
  label,
  alertMessage,
  className,
  ...props
}) => {
  return (
    <React.Fragment>
      <div className="relative z-0 py-1 w-full">
        <input
          placeholder=" "
          autoComplete="off"
          className={cn(InputVariants({ className }))}
          {...props}
        />
        {label && (
          <label className={cn(InputLabelVariants())} htmlFor="floating_filled">
            {label}
          </label>
        )}
      </div>
      {alertMessage && (
        <p className="text-red-400 text-xs transition-1s">{alertMessage}</p>
      )}
    </React.Fragment>
  );
};
