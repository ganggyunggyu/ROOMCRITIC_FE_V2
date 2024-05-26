import React from 'react';
import Stars from '../../../shared/ui/Stars';
import { Link, useParams } from 'react-router-dom';
import useReviewDetail from '../../../shared/hooks/review/useReviewDetail';
import Loading from '../../../shared/ui/Loading';
import { formatMinute } from '../../../shared/lib';
import { useAppDispatch } from '../../../app/store';
import { setBackgroundPath } from '../../../app/store/slice/backgroundPath';
import { scrollToTopSmooth } from '../../../shared/lib/scrollToTop';

export default function ReviewDetailInfo() {
  const { userIdParam, reviewIdParam } = useParams();
  const dispatch = useAppDispatch();
  const prevParam = userIdParam + reviewIdParam;
  React.useEffect(() => {
    scrollToTopSmooth();
  }, [prevParam]);
  const {
    isLoading: isReviewLoading,
    data: review,
    isSuccess,
  } = useReviewDetail(userIdParam, reviewIdParam);

  React.useEffect(() => {
    if (isSuccess && review) {
      dispatch(setBackgroundPath(review.contentBackdropImg));
    }
  }, [isSuccess, review]);

  if (isReviewLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    const formattedDateEnd = formatMinute(review.createdAt);

    return (
      <React.Fragment>
        <Link className='z-20' to={`/profile/${review.userId}`}>
          {review.userName}님의 {review.contentName} 리뷰
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
