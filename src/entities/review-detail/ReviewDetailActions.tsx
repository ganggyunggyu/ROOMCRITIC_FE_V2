import React from 'react';
import { scrollToTop } from '../../shared/util/scrollToTop';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/store';
import Button from '../atom-component/Button';
import useReviewSelect from '../../shared/hooks/review/useReviewDetail';
import Loading from '../Loading';
import useReviewDelete from '../../shared/hooks/review/useReviewDelete';
import { ReviewDeleteDTO } from '../../app/types/dtos';

export default function ReviewDetailActions() {
  const navigator = useNavigate();
  const { userIdParam, reviewIdParam } = useParams();
  const _id = useAppSelector((state) => state.user.userInfo?._id);

  const { isLoading: isReviewLoading, data: Review } = useReviewSelect(userIdParam, reviewIdParam);
  const { mutate } = useReviewDelete();

  if (isReviewLoading) return <Loading />;
  const { review } = Review;

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
      <Button label={'좋아요 🤩'} bg={'main'} className={'lg:w-6/12 w-full text-lg z-10'} />
      <Button label={'별로에요 🧐'} bg={'main'} className={'lg:w-6/12 w-full text-lg z-10'} />
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
