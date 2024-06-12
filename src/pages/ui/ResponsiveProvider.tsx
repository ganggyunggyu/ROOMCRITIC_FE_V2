import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../shared/lib/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '../../app/store';
export const ResponsiveProviderVariants = cva(`w-10/12 flex`, {
  variants: {
    direction: {
      col: `flex-col items-center justify-center`,
      row: `flex-row items-center justify-center`,
    },
  },
});

type ResponsiveProviderProps = {
  children: React.ReactNode;
  direction: 'col' | 'row'; // 'col' 또는 'row' 중 하나여야 함
} & React.HTMLAttributes<HTMLDivElement>;

export const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({
  children,
  direction,
  className,
  ...props
}) => {
  const { navigationType } = useAppSelector((state) => state.navigationType);
  const [currentNavigationType, setCurrentNavigationType] = React.useState(navigationType);
  const [isLoading, setIsLoading] = React.useState(false);

  const push = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  };
  const pop = {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  };

  React.useEffect(() => {
    setCurrentNavigationType(navigationType);
    setIsLoading(true);
  }, [navigationType, currentNavigationType]);
  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.section
          {...(currentNavigationType === 'POP' ? pop : push)}
          transition={{ duration: 0.3, type: 'easeIn' }}
          className={cn(ResponsiveProviderVariants({ direction, className }), {
            ...props,
          })}
        >
          {children}
        </motion.section>
      </AnimatePresence>
    );
  }
};
