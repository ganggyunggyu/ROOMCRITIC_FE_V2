import CategoryReviewList from '../../features/content/ui/CategoryContents';
import ResponsiveProvider from '../ui/ResponsiveProvider';
import ReviewDetailInfo from '../../features/review/ui/ReviewDetailInfo';
import ReviewDetailActions from '../../features/review/ui/ReviewDetailActions';

export default function index() {
  return (
    <ResponsiveProvider direction={'col'} className={'gap-5 z-10 pt-10'}>
      <ReviewDetailInfo />
      <ReviewDetailActions />
      <CategoryReviewList />
    </ResponsiveProvider>
  );
}
