import React from 'react';
import { useAppSelector } from '../../app/store';
import Loading from '../../shared/ui/Loading';
import Button from '../../shared/ui/Button';
import LoginButton from '../../shared/ui/LoginButton';
import CreateForm from './CreateForm';
import useAddWatchContent from '../../shared/hooks/content/ussAddWatchContent';
import useAddWishContent from '../../shared/hooks/content/useAddWishContent';
import ToastMessage from '../../shared/ui/ToastMessage';

export default function ContentDetailActions({ isLoading, data }) {
  const { isLoggedIn, userInfo } = useAppSelector((state) => state.user);
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

  if (isLoading) {
    return <Loading />;
  }

  const content = data?.data.content;
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
    <section className={'flex flex-col w-full gap-5 z-10'}>
      {isLoggedIn ? (
        <React.Fragment>
          <article className='flex gap-5'>
            {isWatch ? (
              <Button
                label={'봤어요 🤩 ✅'}
                bg={'mainHover'}
                className={'lg:w-6/12 w-full text-lg'}
                onClick={handleAddWatch}
              />
            ) : (
              <Button
                label={'봤어요 🤩'}
                bg={'main'}
                className={'lg:w-6/12 w-full text-lg'}
                onClick={handleAddWatch}
              />
            )}
            {isWish ? (
              <Button
                label={'보고싶어요 🧐 ✅'}
                bg={'mainHover'}
                className={'lg:w-6/12 w-full text-lg'}
              />
            ) : (
              <Button
                label={'보고싶어요 🧐'}
                bg={'main'}
                className={'lg:w-6/12 w-full text-lg'}
                onClick={handleAddWish}
              />
            )}
            {isWatchError && <ToastMessage message={'에러가 발생했습니다.'} />}
            {isWishError && <ToastMessage message={'에러가 발생했습니다.'} />}
            {isWatchSuccess && <ToastMessage message={'성공'} />}
            {isWishSuccess && <ToastMessage message={'성공'} />}
          </article>
          <CreateForm content={content} />
        </React.Fragment>
      ) : (
        <LoginButton />
      )}
    </section>
  );
}
