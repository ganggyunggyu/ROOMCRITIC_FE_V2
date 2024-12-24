import React from 'react';
import { useAppSelector } from '@/app/store';
import { Grade } from '@/features/review/ui/grade';
import { useAddWatchContent, useAddWishContent } from '@/entities/content';
import { useDevice } from '@/shared';
import { Overview } from '../content-overview';
import { WishButton } from '../wish-button';
import { WatchButton } from '../watch-button';
import { LikeButton } from '../like-button';

type ContentInfoProps = {
  content: {
    _id: string;
    title: string;
    overview: string;
    originalTitle: string;
    voteAverage: number;
    posterPath: string;
    backdropPath: string;
  };
};

export const Info: React.FC<ContentInfoProps> = ({ content }) => {
  const { userInfo, isLoggedIn } = useAppSelector((state) => state.user);
  const { mutate: watchMutate, isSuccess: isWatchSuccess, isError: isWatchError } = useAddWatchContent();
  const { mutate: whsiMutate, isSuccess: isWishSuccess, isError: isWishError } = useAddWishContent();

  const deviceType = useDevice();

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

  const isMobile = deviceType === 'mobile';

  return (
    <React.Fragment>
      <div className="flex flex-col w-full gap-10 sm:gap-3 z-10 relative justify-between items-start ">
        <div className="flex flex-col gap-5 w-full">
          {/* <div className="w-full h-full">
            <img
              src={`https://www.themoviedb.org/t/p/original/${isMobile ? content.posterPath : content.backdropPath}`}
              alt=""
              className="w-full h-full"
            />
          </div> */}
          <div className="flex flex-col gap-5">
            <p className="text-3xl">{content.title}</p>
            <p className="text-md">{content.originalTitle}</p>
            <p className="border-b border-gray-300">만족도 {content.voteAverage}</p>
            <p className="text-md">애니메이션, 액션, 모험</p>
            <Grade />
          </div>
        </div>
        {isLoggedIn && (
          <article className="flex gap-5">
            <WishButton />
            <WatchButton />
            <LikeButton />
          </article>
        )}
      </div>

      {!isMobile && <Overview overview={content.overview} />}
    </React.Fragment>
  );
};
