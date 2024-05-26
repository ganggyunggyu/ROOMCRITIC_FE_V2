import { useParams } from 'react-router-dom';
import useUserReviewFetch from '../../shared/hooks/review/useUserReviewFetch';
import ResponsiveProvider from '../ui/ResponsiveProvider';
import ProfileContainer from '../../features/user/ui/ProfileContainer';
import CardWrapProvider from '../../entities/wrap-provider/CardWrapProvider';
import Loading from '../../shared/ui/Loading';
import useUserInfoFetch from '../../shared/hooks/user/useUserInfoFetch';

export default function Profile() {
  const { userIdParam = '' } = useParams();

  const { data: userReview, isLoading: isUserReviewLoading } = useUserReviewFetch(userIdParam);
  const { userInfo, isUserInfoLoading } = useUserInfoFetch(userIdParam);

  if (isUserReviewLoading || isUserInfoLoading) return <Loading />;

  if (!isUserReviewLoading || !isUserInfoLoading) {
    return (
      <ResponsiveProvider
        direction={'col'}
        className={'gap-5 md:w-2/3 md:px-5 md:py-10 md:shadow-lg justify-start transition-all'}
      >
        <ProfileContainer />
        <CardWrapProvider
          title={`${userInfo.userInfo.displayName}님이 쓰신 리뷰`}
          cardList={userReview}
        />
      </ResponsiveProvider>
    );
  }
}
