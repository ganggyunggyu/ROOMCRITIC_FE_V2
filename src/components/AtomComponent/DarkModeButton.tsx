import React from 'react';
import Sun from '../../shared/icons/Sun';
import Moon from '../../shared/icons/Moon';

// type DarkModeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
//   VariantProps<typeof ButtonVariants> & {
//     label?: string;
//     item?: React.ReactElement;
//     bg: string;
//     text: string;
//   };

type DarkModeButtonProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeButton: React.FC<DarkModeButtonProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className='h-12 w-12 border rounded-full flex items-center justify-center fixed bottom-8 right-8 z-20'
    >
      {darkMode ? <Sun /> : <Moon />}
    </button>
  );
};

export default DarkModeButton;
