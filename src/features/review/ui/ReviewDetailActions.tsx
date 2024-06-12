import React from 'react';
import { scrollToTop } from '../../../shared/lib/scrollToTop';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../shared/ui';
import { useAppSelector } from '../../../app/store';
import { useReviewDelete, useReviewDetail } from '../api/hooks';

export function ReviewDetailActions() {
  const navigator = useNavigate();
  const { userIdParam, reviewIdParam } = useParams();
  const { isLoading: isReviewLoading, data: review } = useReviewDetail();
  const { mutate: deleteMutate } = useReviewDelete();
  const { isLoggedIn, userInfo } = useAppSelector((state) => state.user);

  if (isReviewLoading) return <div />;

  const redirectUpdatePage = () => {
    navigator(`/review/update/${reviewIdParam}/${userIdParam}`);
    scrollToTop();
  };
  const reviewDeleteHandler = () => {
    deleteMutate(review._id, {
      onSuccess: () => {
        navigator(`/content/${review.contentId}`);
      },
    });
  };

  return (
    <React.Fragment>
      <Button label='좋아요' variant='main' />

      {isLoggedIn && userIdParam === userInfo._id && (
        <React.Fragment>
          <Button
            onClick={redirectUpdatePage}
            label={'수정'}
            variant={'main'}
            className={'lg:w-6/12 w-full text-lg z-10'}
          />
          <Button
            onClick={reviewDeleteHandler}
            label={'삭제'}
            variant={'alert'}
            className={'lg:w-6/12 w-full text-lg z-10'}
          />
        </React.Fragment>
      )}
      <Link
        className='text-xl cursor-pointer hover:text-violet-400 z-10'
        to={`/content/${review.contentId}`}
      >
        {review.contentName} 다른 리뷰도 보러가기 !
      </Link>
    </React.Fragment>
  );
}
