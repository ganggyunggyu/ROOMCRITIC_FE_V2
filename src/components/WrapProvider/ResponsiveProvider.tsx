import { cva } from 'class-variance-authority';
import { cn } from '../../util/cn';
export const ResponsiveProviderVariants = cva(`w-10/12 flex pt-10`, {
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
    <section
      className={cn(ResponsiveProviderVariants({ direction, className }), {
        ...props,
      })}
    >
      {children}
    </section>
  );
};
export default ResponsiveProvider;
