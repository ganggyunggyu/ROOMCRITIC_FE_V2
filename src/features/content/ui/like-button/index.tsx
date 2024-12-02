import { IoMdHeart } from 'react-icons/io';

export const LikeButton = () => {
  return (
    <button className="w-24 h-24 flex flex-col items-center justify-center gap-2">
      <IoMdHeart className="w-full h-full" />
      <p>좋아요!</p>
    </button>
  );
};
