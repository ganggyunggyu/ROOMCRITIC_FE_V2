import { IoMdHeart } from 'react-icons/io';

export const WishButton = () => {
  return (
    <button className="w-24 h-24 flex flex-col items-center justify-center gap-2">
      <IoMdHeart className="w-full h-full" />
      <p>보고싶어요!</p>
    </button>
  );
};
