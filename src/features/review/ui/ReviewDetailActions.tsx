import React from 'react';
import { scrollToTop } from '../../../shared/lib/scrollToTop';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../shared/ui';
import useReviewSelect from '../../../shared/hooks/review/useReviewDetail';
import Loading from '../../../shared/ui/Loading';
import useReviewDelete from '../../../shared/hooks/review/useReviewDelete';
import { useReviewLike } from '../hooks/useReviewLike';
import { useReviewDislike } from '../hooks/useReviewDislike';
import { useReviewLikeFetch } from '../hooks/useReviewLikeFetch';
import { ReviewDeleteDTO } from '../../../app/types/dtos';
import { useAppSelector } from '../../../app/store';

export default function ReviewDetailActions() {
  const navigator = useNavigate();
  const { userIdParam, reviewIdParam } = useParams();
  const { isLoading: isReviewLoading, data: review } = useReviewSelect(userIdParam, reviewIdParam);
  const { mutate: deleteMutate } = useReviewDelete();
  const { isLoggedIn, userInfo } = useAppSelector((state) => state.user);

  const {
    data: likeStatus,
    isLoading: isLikeStatusLoading,
    isError: isLikeStatusError,
    isSuccess: isLikeStatusSuccess,
    refetch: likeRefetch,
  } = useReviewLikeFetch();
  const { mutate: likeMutate } = useReviewLike();

  const { mutate: dislikeMutate } = useReviewDislike();

  const handleLike = () => {
    likeMutate(
      { reviewId: reviewIdParam, userId: userIdParam },
      { onSuccess: () => likeRefetch(), onError: (error) => console.log(error.message) },
    );
  };
  const handleDislike = () => {
    dislikeMutate(
      { reviewId: reviewIdParam, userId: userIdParam },
      { onSuccess: () => likeRefetch(), onError: (error) => console.log(error.message) },
    );
  };
  if (isReviewLoading) return <Loading />;

  const redirectUpdatePage = () => {
    navigator(`/update/${userIdParam}/${reviewIdParam}`);
    scrollToTop();
  };
  const reviewDeleteHandler = () => {
    const reviewDeleteDTO: ReviewDeleteDTO = {
      userId: userIdParam,
      reviewId: review._id,
    };
    deleteMutate(reviewDeleteDTO, {
      onSuccess: () => {
        navigator(`/content/${review.contentType}/${review.contentId}`);
        console.log(review);
      },
    });
  };

  return (
    <React.Fragment>
      {isLikeStatusLoading && (
        <React.Fragment>
          <Button
            onClick={handleLike}
            label={'좋아요 🤩'}
            bg={'main'}
            className={'lg:w-6/12 w-full text-lg z-10'}
          />
          <Button
            onClick={handleDislike}
            label={'별로에요 🧐'}
            bg={'main'}
            className={'lg:w-6/12 w-full text-lg z-10'}
          />
        </React.Fragment>
      )}
      {isLikeStatusError && (
        <React.Fragment>
          <Button
            onClick={handleLike}
            label={'좋아요 🤩'}
            className={'lg:w-6/12 w-full text-lg z-10'}
            bg={'main'}
          />
          <Button
            onClick={handleDislike}
            label={'별로에요 🧐'}
            bg={'main'}
            className={'lg:w-6/12 w-full text-lg z-10'}
          />
        </React.Fragment>
      )}
      {isLikeStatusSuccess && likeStatus && (
        <React.Fragment>
          <Button
            onClick={handleLike}
            label={likeStatus.isLike ? '좋아요 🤩 ✅' : '좋아요 🤩'}
            bg={likeStatus.isLike ? 'mainHover' : 'main'}
            className={'lg:w-6/12 w-full text-lg z-10'}
          />
          <Button
            onClick={handleDislike}
            label={!likeStatus.isLike ? '별로에요 🧐 ✅' : '별로에요 🧐'}
            bg={(!likeStatus.isLike && 'mainHover') || 'default'}
            className={'lg:w-6/12 w-full text-lg z-10'}
          />
        </React.Fragment>
      )}

      {isLoggedIn && userIdParam === userInfo._id && (
        <React.Fragment>
          <Button
            onClick={redirectUpdatePage}
            label={'수정'}
            bg={'main'}
            className={'lg:w-6/12 w-full text-lg z-10'}
          />
          <Button
            onClick={reviewDeleteHandler}
            label={'삭제'}
            bg={'alert'}
            className={'lg:w-6/12 w-full text-lg z-10'}
          />
        </React.Fragment>
      )}
      <Link
        className='text-xl cursor-pointer hover:text-violet-400 z-10'
        to={`/content/${review.contentType}/${review.contentId}`}
      >
        {review.contentName} 다른 리뷰도 보러가기 !
      </Link>
    </React.Fragment>
  );
}
