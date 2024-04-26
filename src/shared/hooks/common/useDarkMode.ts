import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setDarkMode, setDarkModeClasses } from '../../../app/store/slice/darkModeSlice';

const useDarkMode = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const darkModeClasses = useAppSelector((state) => state.darkMode.darkModeClasses);
  const dispatch = useAppDispatch();

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  React.useEffect(() => {
    if (isDarkMode) {
      dispatch(setDarkModeClasses('bg-zinc-800 text-white'));
      document.body.style.backgroundColor = '#27272A';
    } else {
      dispatch(setDarkModeClasses('bg-white text-black'));
      document.body.style.backgroundColor = 'white';
    }
  }, [isDarkMode, darkModeClasses, dispatch]);

  React.useEffect(() => {
    if (isDarkMode) {
      dispatch(setDarkModeClasses('bg-zinc-800 text-white'));
      document.body.style.backgroundColor = '#27272A';
    } else {
      dispatch(setDarkModeClasses('bg-white text-black'));
      document.body.style.backgroundColor = 'white';
      document.body.classList.add('bg-zinc-800');
    }
  }, [isDarkMode, darkModeClasses, dispatch]);

  return { isDarkMode, darkModeClasses, toggleDarkMode };
};

export default useDarkMode;
