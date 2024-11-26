import { Category, ReviewDetailActions, ReviewDetailInfo } from '@/features';
import { ResponsiveProvider } from '../../widgets';

export default function index() {
  return (
    <ResponsiveProvider direction={'col'} className={'gap-5 z-10 pt-10'}>
      <ReviewDetailInfo />
      <ReviewDetailActions />
      <Category />
    </ResponsiveProvider>
  );
}
