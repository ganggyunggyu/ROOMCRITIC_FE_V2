import React from 'react';

import { useParams } from 'react-router-dom';
import { Button } from '@/shared';
import { useAppSelector } from '@/app/store';
import { useAddWatchContent } from '@/entities';

export const WatchButton: React.FC = () => {
  const { contentIdParam } = useParams();
  const { userInfo } = useAppSelector((state) => state.user);
  const { mutate: watchMutate, isSuccess: isWatchSuccess, isError: isWatchError } = useAddWatchContent();

  const [isWatch, setIsWatch] = React.useState(false);

  const isCurrWatch = isWatch;

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

  return (
    <React.Fragment>
      {isWatch ? (
        <Button label={'봤어요'} variant={'mainHover'} className={'w-16 h-16'} onClick={handleAddWatch} />
      ) : (
        <Button label={'봤어요'} variant={'main'} className={'w-16 h-16'} onClick={handleAddWatch} />
      )}
    </React.Fragment>
  );
};
