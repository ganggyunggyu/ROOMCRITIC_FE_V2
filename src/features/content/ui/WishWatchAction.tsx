import React from 'react';

import { useParams } from 'react-router-dom';
import { Button } from '../../../shared/ui';
import { useAppSelector } from '../../../shared/store';
import { useAddWatchContent, useAddWishContent } from '@/entities';

export const WishWatchAction: React.FC = () => {
  const { contentIdParam } = useParams();
  const { userInfo } = useAppSelector((state) => state.user);
  const { mutate: watchMutate, isSuccess: isWatchSuccess, isError: isWatchError } = useAddWatchContent();
  const { mutate: wishMutate, isSuccess: isWishSuccess, isError: isWishError } = useAddWishContent();

  const [isWatch, setIsWatch] = React.useState(false);
  const [isWish, setIsWish] = React.useState(false);
  const isCurrWatch = isWatch;
  const isCurrWish = isWish;

  const handleAddWatch = () => {
    setIsWatch(!isWatch);
    watchMutate(
      { userId: userInfo._id, contentId: contentIdParam },
      {
        onError() {
          setIsWatch(isCurrWatch);
        },
      },
    );
  };
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
    <article className="flex gap-5">
      {isWatch ? (
        <Button label={'봤어요'} variant={'mainHover'} className={'w-16 h-16'} onClick={handleAddWatch} />
      ) : (
        <Button label={'봤어요'} variant={'main'} className={'w-16 h-16'} onClick={handleAddWatch} />
      )}
      {isWish ? (
        <Button label={'보는중'} variant={'mainHover'} className={'w-16 h-16'} />
      ) : (
        <Button label={'보는중'} variant={'main'} className={'w-16 h-16'} onClick={handleAddWish} />
      )}
    </article>
  );
};
