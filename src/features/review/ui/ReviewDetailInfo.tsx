import React from 'react';
import Stars from '../../../shared/ui/Stars';
import { Link } from 'react-router-dom';
import { formatMinute } from '../../../shared/lib';
import { useAppDispatch } from '../../../app/store';
import { setBackgroundPath } from '../../../app/store/slice/backgroundPath';
import { useReviewDetail } from '../hooks/hooks';

export default function ReviewDetailInfo() {
  const dispatch = useAppDispatch();
  const { isLoading: isReviewLoading, data: review, isSuccess } = useReviewDetail();

  React.useEffect(() => {
    if (isSuccess && review) {
      dispatch(setBackgroundPath(review.contentBackdropImg));
    }
  }, [isSuccess, review]);

  if (isReviewLoading) {
    return <div />;
  }

  if (isSuccess) {
    const formattedDateEnd = formatMinute(review.createdAt);

    return (
      <React.Fragment>
        <Link className='z-20' to={`/profile/${review.userId}`}>
          {review.userName}님의 {review.title} 리뷰
        </Link>
        <p>{formattedDateEnd} 작성</p>
        <p className='border border-b-4 p-2 text-center leading-loose text-3xl md:text-5xl'>
          {review.lineReview}
        </p>
        <Stars grade={review.grade} />
      </React.Fragment>
    );
  }
}
