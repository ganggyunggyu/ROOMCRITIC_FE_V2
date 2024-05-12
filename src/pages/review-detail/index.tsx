import CategoryReviewList from '../../features/content/ui/CategoryContents';
import ResponsiveProvider from '../ui/ResponsiveProvider';
import ReviewDetailInfo from '../../entities/review-detail/ReviewDetailInfo';
import ReviewDetailActions from '../../entities/review-detail/ReviewDetailActions';

export default function ReviewDetail() {
  return (
    <ResponsiveProvider direction={'col'} className={'gap-5 z-10'}>
      <ReviewDetailInfo />
      <ReviewDetailActions />
      <CategoryReviewList />
    </ResponsiveProvider>
  );
}
