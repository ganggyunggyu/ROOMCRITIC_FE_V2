import React from 'react';
import CategoryReviewList from '../entities/CategoryContents';
import ResponsiveProvider from '../entities/wrap-provider/ResponsiveProvider';
import ReviewDetailInfo from '../entities/review-detail/ReviewDetailInfo';
import ReviewDetailActions from '../entities/review-detail/ReviewDetailActions';

export default function ReviewDetail() {
  return (
    <React.Fragment>
      <ResponsiveProvider direction={'col'} className={'gap-5 z-10'}>
        <ReviewDetailInfo />
        <ReviewDetailActions />
      </ResponsiveProvider>
      <CategoryReviewList />
    </React.Fragment>
  );
}
