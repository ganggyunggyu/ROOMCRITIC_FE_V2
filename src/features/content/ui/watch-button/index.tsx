import { FaEye } from 'react-icons/fa';

export const WatchButton = () => {
  return (
    <button className="w-24 h-24 flex flex-col items-center justify-center gap-2">
      <FaEye className="w-full h-full" />
      <p>보는중!</p>
    </button>
  );
};
