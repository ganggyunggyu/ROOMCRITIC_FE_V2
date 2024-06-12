import { cva } from 'class-variance-authority';

export const ButtonVariants = cva(
  `flex justify-center items-center rounded-md p-2 text-sm font-semibold 
  transition-all shadow-sm focus-visible:outline focus-visible:outline-2 
  focus-visible:outline-offset-2 focus-visible:outline-red-600 px-3 py-1 z-10`,
  {
    variants: {
      variant: {
        // default: `bg-slate-200 hover:bg-slate-400 text-black`,
        main: `dark:bg-slate-200 dark:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-slate-200 dark:hover:ring-4 dark:hover:ring-slate-200
              bg-zinc-700 text-slate-200 hover:bg-slate-200 hover:text-zinc-700 hover:ring-4 hover:ring-zinc-700
        `,
        alert: 'bg-red-400 hover:bg-red-500',
        disable: `bg-slate-400 hover:bg-slate-500 text-black`,
        mainHover: `bg-slate-500`,
        bgNone: `text-black dark:text-white hover:text-violet-400 dark:hover:text-violet-400`,
      },
    },
    defaultVariants: {
      // bg: 'default',
      // text: 'white',
    },
  },
);
