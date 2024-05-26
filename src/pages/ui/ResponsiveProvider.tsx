import { cva } from 'class-variance-authority';
import { cn } from '../../shared/lib/cn';
import { motion } from 'framer-motion';

export const ResponsiveProviderVariants = cva(`w-10/12 flex `, {
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

const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({
  children,
  direction,
  className,
  ...props
}) => {
  return (
    <motion.section
      className={cn(ResponsiveProviderVariants({ direction, className }), {
        ...props,
      })}
      // initial={{ x: 300, opacity: 0 }}
      // animate={{ x: 0, opacity: 1 }}
      // exit={{ x: -300, opacity: 0 }}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      initial={{ x: '100vw' }}
      animate={{ x: 0 }}
      exit={{ x: '-100vw' }}
      // initial={{ scale: 0.7 }}
      // animate={{ scale: 1 }}
      // initial={{ y: '-100%' }}
      // animate={{ y: 0 }}
      // exit={{ y: '100%' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );
};
export default ResponsiveProvider;
