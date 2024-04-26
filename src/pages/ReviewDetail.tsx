import React from 'react';
import CategoryReviewList from '../components/CategoryContents';
import ResponsiveProvider from '../components/wrap-provider/ResponsiveProvider';
import ReviewDetailInfo from '../components/review-detail/ReviewDetailInfo';
import ReviewDetailActions from '../components/review-detail/ReviewDetailActions';

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
