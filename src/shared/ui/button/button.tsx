import React from 'react';
import { cn } from '../../lib/cn';
import { ButtonProps } from './button.prop';
import { ButtonVariants } from './button.style';

export const Button: React.FC<ButtonProps> = ({ label, item, bg, text, className, ...props }) => {
  return (
    <button type='button' className={cn(ButtonVariants({ bg, text, className }))} {...props}>
      {label && label}
      {item && item}
    </button>
  );
};
Button.displayName = 'Button';
