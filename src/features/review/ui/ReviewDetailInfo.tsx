import React from 'react';
import Stars from '../../../shared/ui/Stars';
import { Link, useParams } from 'react-router-dom';
import useReviewDetail from '../../../shared/hooks/review/useReviewDetail';
import Loading from '../../../shared/ui/Loading';
import { formatMinute } from '../../../shared/lib';
// import DetailBackground from '../../../pages/ui/DetailBackground';

export default function ReviewDetailInfo() {
  const { userIdParam, reviewIdParam } = useParams();
  const {
    isLoading: isReviewLoading,
    data: review,
    isSuccess,
  } = useReviewDetail(userIdParam, reviewIdParam);

  if (isReviewLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    const formattedDateEnd = formatMinute(review.createdAt);
    console.log(review);
    return (
      <React.Fragment>
        {/* <DetailBackground path={review.contentBackdropImg} /> */}
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
