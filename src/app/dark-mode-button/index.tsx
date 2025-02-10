import React from 'react';
import Sun from '../../shared/ui/icons/Sun';
import Moon from '../../shared/ui/icons/Moon';
import { useDarkMode } from './hooks';

const DarkModeButton: React.FC = () => {
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  return (
    <button
      onClick={toggleDarkMode}
      className={`${isDarkMode ? 'bg-zinc-800' : 'bg-white'} h-12 w-12 border rounded-full flex items-center justify-center fixed bottom-8 right-8 z-20`}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
};

export { DarkModeButton };
