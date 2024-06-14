import React from 'react';
import { Button } from '../../../shared/ui';

import { useAppSelector } from '../../../shared/store';
import { WishWatchAction } from '../../../entities/content/ui/WishWatchAction';
import { Grade } from '../../../entities/review/ui/Grade';
import { Overview } from '../../../entities/content/ui/Overview';
import { H } from '../../../entities/content';

type ContentInfoProps = {
  content: {
    _id: string;
    title: string;
    overview: string;
    originalTitle: string;
    voteAverage: number;
    posterPath: string;
  };
};

export const Info: React.FC<ContentInfoProps> = ({ content }) => {
  const { userInfo } = useAppSelector((state) => state.user);
  const {
    mutate: watchMutate,
    isSuccess: isWatchSuccess,
    isError: isWatchError,
  } = H.useAddWatchContent();
  const {
    mutate: whsiMutate,
    isSuccess: isWishSuccess,
    isError: isWishError,
  } = H.useAddWishContent();

  const [isWatch, setIsWatch] = React.useState(false);
  const [isWish, setIsWish] = React.useState(false);
  const isCurrWatch = isWatch;
  const isCurrWish = isWish;
  const handleAddWatch = () => {
    setIsWatch(!isWatch);
    watchMutate(
      { userId: userInfo._id, contentId: content._id },
      {
        onError() {
          setIsWatch(isCurrWatch);
        },
      },
    );
  };
  const handleAddWish = () => {
    setIsWish(!isWish);
    whsiMutate(
      { userId: userInfo._id, contentId: content._id },
      {
        onError() {
          setIsWish(isCurrWish);
        },
      },
    );
  };

  return (
    <React.Fragment>
      <div className='flex flex-col sm:flex-row w-full gap-5 sm:gap-3 z-10 relative justify-between items-start sm:items-center'>
        <div className='flex flex-col md:flex-row gap-5 w-full'>
          <div className='w-48 h-80'>
            <img
              src={`https://www.themoviedb.org/t/p/original/${content.posterPath}`}
              alt=''
              className='w-full h-full'
            />
          </div>
          <div className='flex flex-col gap-5'>
            <p className='text-3xl'>{content.title}</p>
            <p className='text-md'>{content.originalTitle}</p>
            <p className='border-b border-gray-300'>만족도 {content.voteAverage}</p>
            <p className='text-md'>애니메이션, 액션, 모험</p>
            <Grade />
          </div>
        </div>
        <WishWatchAction />
      </div>
      <Overview overview={content.overview} />
    </React.Fragment>
  );
};
