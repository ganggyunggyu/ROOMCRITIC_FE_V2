import { VariantProps } from 'class-variance-authority';
import { ButtonVariants } from './button.style';
import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof ButtonVariants> & {
    label?: string;
    item?: React.ReactElement;
    bg?: string;
    text?: string;
  };
