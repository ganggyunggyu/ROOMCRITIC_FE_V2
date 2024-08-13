import { cn } from '../../shared/lib/cn';
import { useAppSelector } from '../../shared/store';

export const AppProvider = ({ children }) => {
  const { darkModeClasses } = useAppSelector((state) => state.darkMode);
  return (
    <main className={cn(`${darkModeClasses} transition-all flex flex-col items-center justify-center`)}>
      {children}
    </main>
  );
};
