import React from 'react';
import { FaEye } from 'react-icons/fa';

export const WatchButton = () => {
  const [islike, setIslike] = React.useState(false);

  const handleLikeClick = () => {
    setIslike(!islike);
  };
  return (
    <button onClick={handleLikeClick} className="w-24 h-24 flex flex-col items-center justify-center gap-2">
      <FaEye className={`w-full h-full ${islike && 'fill-violet-500'}`} />
      <p>보는중!</p>
    </button>
  );
};
