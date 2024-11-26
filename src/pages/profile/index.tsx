import { ResponsiveProvider } from '../../widgets/ui';
import { Review, User } from '../../features';

export default function Profile() {
  return (
    <ResponsiveProvider
      direction={'col'}
      className={'gap-5 md:w-2/3 md:px-5 md:py-10 md:shadow-lg justify-start transition-all mt-12'}
    >
      <User.U.ProfileContainer />
      <Review.U.ReviewInfinityList title="작성한 리뷰" query={Review.H.useReviewByUser} className="md:grid-cols-2" />
    </ResponsiveProvider>
  );
}
