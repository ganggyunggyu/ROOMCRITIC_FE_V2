import { Content, Review } from '../../features';
import { ResponsiveProvider } from '../ui';

export default function index() {
  return (
    <ResponsiveProvider direction={'col'} className={'gap-5 z-10 pt-10'}>
      <Review.U.ReviewDetailInfo />
      <Review.U.ReviewDetailActions />
      <Content.U.Category />
    </ResponsiveProvider>
  );
}
