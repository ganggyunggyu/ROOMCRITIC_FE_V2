import React from 'react';

import { useParams } from 'react-router-dom';
import { Button } from '@/shared';
import { useAppSelector } from '@/app/store';
import { useAddWishContent } from '@/entities';

export const WishButton: React.FC = () => {
  const { contentIdParam } = useParams();
  const { userInfo } = useAppSelector((state) => state.user);
  const { mutate: wishMutate, isSuccess: isWishSuccess, isError: isWishError } = useAddWishContent();

  const [isWish, setIsWish] = React.useState(false);
  const isCurrWish = isWish;

  const handleAddWish = () => {
    setIsWish(!isWish);
    wishMutate(
      { userId: userInfo._id, contentId: contentIdParam },
      {
        onError() {
          setIsWish(isCurrWish);
        },
      },
    );
  };

  return (
    <React.Fragment>
      {isWish ? (
        <Button label={'보는중'} variant={'mainHover'} className={'w-16 h-16'} />
      ) : (
        <Button label={'보는중'} variant={'main'} className={'w-16 h-16'} onClick={handleAddWish} />
      )}
    </React.Fragment>
  );
};
