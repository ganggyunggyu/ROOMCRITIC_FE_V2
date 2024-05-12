import React from 'react';
import { scrollToTop } from '../../shared/lib/scrollToTop';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/store';
import Button from '../../shared/ui/Button';
import useReviewSelect from '../../shared/hooks/review/useReviewDetail';
import Loading from '../../shared/ui/Loading';
import useReviewDelete from '../../shared/hooks/review/useReviewDelete';
import { ReviewDeleteDTO } from '../../app/types/dtos';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchReviewLikeStatus, sendDislikeReview, sendLikeReview } from '../../shared/api/API';

export default function ReviewDetailActions() {
  const navigator = useNavigate();
  const { userIdParam, reviewIdParam } = useParams();
  const _id = useAppSelector((state) => state.user.userInfo?._id);

  const { isLoading: isReviewLoading, data: review } = useReviewSelect(userIdParam, reviewIdParam);
  const { mutate } = useReviewDelete();
  const testQuery = useQuery({
    queryKey: ['like', reviewIdParam, userIdParam],
    queryFn: () => fetchReviewLikeStatus({ reviewId: reviewIdParam, userId: _id }),
  });

  const { mutate: likeMutate } = useMutation({
    mutationFn: sendLikeReview,
  });

  const { mutate: dislikeMutate } = useMutation({
    mutationFn: sendDislikeReview,
  });

  const handleLike = () => {
    likeMutate(
      { reviewId: reviewIdParam, userId: _id },
      { onSuccess: () => testQuery.refetch(), onError: (error) => console.log(error.message) },
    );
  };
  const handleDislike = () => {
    dislikeMutate(
      { reviewId: reviewIdParam, userId: _id },
      { onSuccess: () => testQuery.refetch(), onError: (error) => console.log(error.message) },
    );
  };
  if (isReviewLoading) return <Loading />;

  const directUpdate = () => {
    navigator(`/update/${userIdParam}/${reviewIdParam}`);
    scrollToTop();
  };
  const handleReviewDelete = () => {
    const reviewDeleteDTO: ReviewDeleteDTO = {
      userId: _id,
      reviewId: review._id,
    };
    mutate(reviewDeleteDTO, {
      onSuccess: () => {
        navigator(`/content/${review.contentType}/${review.contentId}`);
        console.log(review);
      },
    });
  };

  return (
    <React.Fragment>
      {testQuery.isLoading && (
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
      {testQuery.isError && (
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
      {testQuery.isSuccess && testQuery.data.data && (
        <React.Fragment>
          <Button
            onClick={handleLike}
            label={testQuery.data.data.isLike ? '좋아요 🤩 ✅' : '좋아요 🤩'}
            bg={testQuery.data.data.isLike ? 'mainHover' : 'main'}
            className={'lg:w-6/12 w-full text-lg z-10'}
          />
          <Button
            onClick={handleDislike}
            label={!testQuery.data.data.isLike ? '별로에요 🧐 ✅' : '별로에요 🧐'}
            bg={!testQuery.data.data.isLike ? 'mainHover' : 'main'}
            className={'lg:w-6/12 w-full text-lg z-10'}
          />
        </React.Fragment>
      )}

      {_id === review.userId && (
        <React.Fragment>
          <Button
            onClick={directUpdate}
            label={'수정'}
            bg={'main'}
            className={'lg:w-6/12 w-full text-lg z-10'}
          />
          <Button
            onClick={handleReviewDelete}
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
