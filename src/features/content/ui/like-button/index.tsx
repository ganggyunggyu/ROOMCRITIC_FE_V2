import { FaThumbsUp } from 'react-icons/fa';

export const LikeButton = () => {
  return (
    <button className="w-24 h-24 flex flex-col items-center justify-center gap-2">
      <FaThumbsUp className="w-full h-full" />
      <p>좋아요!</p>
    </button>
  );
};
