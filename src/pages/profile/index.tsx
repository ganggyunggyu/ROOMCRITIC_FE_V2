import ResponsiveProvider from '../ui/ResponsiveProvider';
import ProfileContainer from '../../features/user/ui/ProfileContainer';
import { useReviewByUser } from '../../features/review/hooks/hooks';
import { ReviewInfinityList } from '../../features/review/ui/ReviewInfinityList';

export default function Profile() {
  return (
    <ResponsiveProvider
      direction={'col'}
      className={'gap-5 md:w-2/3 md:px-5 md:py-10 md:shadow-lg justify-start transition-all mt-12'}
    >
      <ProfileContainer />
      <ReviewInfinityList title='작성한 리뷰' query={useReviewByUser} className='md:grid-cols-2' />
    </ResponsiveProvider>
  );
}
