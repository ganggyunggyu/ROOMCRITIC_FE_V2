import React from 'react';
import { Button } from '../../shared/ui';
import useAddWatchContent from '../../shared/hooks/content/ussAddWatchContent';
import useAddWishContent from '../../shared/hooks/content/useAddWishContent';
import { useAppSelector } from '../../app/store';
import Stars from '../../shared/ui/Stars';

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

const ContentInfo: React.FC<ContentInfoProps> = ({ content }) => {
  const { userInfo } = useAppSelector((state) => state.user);
  const {
    mutate: watchMutate,
    isSuccess: isWatchSuccess,
    isError: isWatchError,
  } = useAddWatchContent();
  const {
    mutate: whsiMutate,
    isSuccess: isWishSuccess,
    isError: isWishError,
  } = useAddWishContent();

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
            <div className='flex flex-col md:flex-row gap-4 items-center  md:absolute bottom-0'>
              <div className='flex flex-row md:flex-col gap-2 items-center'>
                <p>평균 별점</p>
                <p>5.0 (100개)</p>
              </div>
              <Stars grade={5} />
            </div>
          </div>
        </div>
        <article className='flex gap-5 absolute bottom-48 md:top-0 right-0'>
          {isWatch ? (
            <Button
              label={'봤어요'}
              bg={'mainHover'}
              className={'w-16 h-16'}
              onClick={handleAddWatch}
            />
          ) : (
            <Button
              label={'봤어요'}
              variant={'main'}
              className={'w-16 h-16'}
              onClick={handleAddWatch}
            />
          )}
          {isWish ? (
            <Button label={'보는중'} variant={'mainHover'} className={'w-16 h-16'} />
          ) : (
            <Button
              label={'보는중'}
              variant={'main'}
              className={'w-16 h-16'}
              onClick={handleAddWish}
            />
          )}
        </article>
      </div>
      <div className='w-full border-y border-solid py-5 border-slate-200'>
        {content.overview ? (
          <p className='leading-loose overflow-y-scroll'>
            {content.overview.split('다.').map((sentence, index) => {
              console.log(sentence, index, content.overview.split('다.').length);
              if (content.overview.split('다.').length - 1 !== index) sentence = sentence + '다.';

              return (
                <span key={index}>
                  {sentence.trim()}
                  {index < content.overview.split('다.').length - 1 && (
                    <>
                      <br />
                    </>
                  )}
                </span>
              );
            })}
          </p>
        ) : (
          <p>등록 된 줄거리가 없습니다.</p>
        )}
      </div>
    </React.Fragment>
  );
};
export default ContentInfo;
