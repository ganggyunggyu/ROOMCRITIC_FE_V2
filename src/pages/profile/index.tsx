import { ResponsiveProvider } from '@/widgets';
import { ReviewInfinityList, ProfileContainer } from '@/features';
import { useReviewByUser } from '@/entities';

export default function Profile() {
  return (
    <ResponsiveProvider
      direction={'col'}
      className={
        'gap-5 md:w-2/3 md:px-5 md:py-10 md:shadow-lg justify-start transition-all mt-12'
      }
    >
      <ProfileContainer />
      <ReviewInfinityList
        title="작성한 리뷰"
        query={useReviewByUser}
        className="md:grid-cols-2"
      />
    </ResponsiveProvider>
  );
}
