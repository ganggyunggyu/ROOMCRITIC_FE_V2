import { useParams } from 'react-router-dom';
import useUserReviewFetch from '../../shared/hooks/review/useUserReviewFetch';
import useAuthenticatedUserInfo from '../../shared/hooks/auth/useAuthenticatedUserInfo';
import ResponsiveProvider from '../../entities/wrap-provider/ResponsiveProvider';
import ProfileContainer from '../../entities/profile/ProfileContainer';
import CardWrapProvider from '../../entities/wrap-provider/CardWrapProvider';
import Loading from '../../entities/Loading';

export default function Profile() {
  const { userIdParam = '' } = useParams();
  const { displayName } = useAuthenticatedUserInfo();

  const { data: userReview, isLoading: isUserReviewLoading } = useUserReviewFetch(userIdParam);

  if (isUserReviewLoading) return <Loading />;

  if (!isUserReviewLoading) {
    const reviews = userReview?.data?.reviews;

    return (
      <ResponsiveProvider
        direction={'col'}
        className={'gap-5 md:w-2/3 md:px-5 md:py-10 md:shadow-lg justify-start'}
      >
        <ProfileContainer />
        <CardWrapProvider
          isHover={true}
          title={`${displayName}님이 쓰신 리뷰`}
          cardList={reviews}
        />
      </ResponsiveProvider>
    );
  }
}
