import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { darkModeClassesState, isDarkModeState } from '../store/atoms';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);
  const [darkModeClasses, setDarkModeClasses] = useRecoilState(darkModeClassesState);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      setDarkModeClasses('bg-zinc-800 text-white');
      document.body.style.backgroundColor = '#27272A';
    } else {
      setDarkModeClasses('bg-white text-black');
      document.body.style.backgroundColor = 'white';
    }
  }, [isDarkMode, darkModeClasses]);

  useEffect(() => {
    if (isDarkMode) {
      setDarkModeClasses('bg-zinc-800 text-white');
      document.body.style.backgroundColor = '#27272A';
    } else {
      setDarkModeClasses('bg-white text-black');
      document.body.style.backgroundColor = 'white';
    }
  }, [isDarkMode]);

  return { isDarkMode, darkModeClasses, toggleDarkMode };
};

export default useDarkMode;
