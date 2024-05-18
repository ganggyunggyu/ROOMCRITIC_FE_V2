import { cva } from 'class-variance-authority';

export const ButtonVariants = cva(
  `flex justify-center items-center rounded-md p-2 text-sm text-white font-semibold 
  transition-1s shadow-sm focus-visible:outline focus-visible:outline-2 
  focus-visible:outline-offset-2 focus-visible:outline-red-600 px-3 py-1`,
  {
    variants: {
      bg: {
        default: `bg-slate-200 hover:bg-slate-400 text-black`,
        main: `bg-violet-400 hover:bg-violet-500`,
        alert: 'bg-red-400 hover:bg-red-500',
        disable: `bg-slate-400 hover:bg-slate-500 text-black`,
        mainHover: `bg-violet-500`,
      },
      text: {
        white: `text-white`,
        black: 'text-black',
      },
    },
  },
);
