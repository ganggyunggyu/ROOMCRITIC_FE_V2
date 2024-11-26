import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setDarkMode, setDarkModeClasses } from '../store/slice/darkModeSlice';

export const useDarkMode = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const darkModeClasses = useAppSelector((state) => state.darkMode.darkModeClasses);
  const dispatch = useAppDispatch();

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!isDarkMode));
  };
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      dispatch(setDarkModeClasses('bg-zinc-800 text-white'));
      document.body.style.backgroundColor = '#27272A';
    } else {
      document.documentElement.classList.remove('dark');
      dispatch(setDarkModeClasses('bg-white text-black'));
      document.body.style.backgroundColor = 'white';
      document.body.classList.add('bg-zinc-800');
    }
  }, [isDarkMode, darkModeClasses, dispatch]);

  return { isDarkMode, toggleDarkMode };
};
