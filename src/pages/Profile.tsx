import { useParams } from 'react-router-dom';
import CardWrapProvider from '../components/wrap-provider/CardWrapProvider';
import useUserReviewFetch from '../shared/hooks/review/useUserReviewFetch';
import Loading from '../components/Loading';
import ResponsiveProvider from '../components/wrap-provider/ResponsiveProvider';
import ProfileImage from '../components/profile/ProfileImage';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileScore from '../components/profile/ProfileScore';
import { useAppSelector } from '../app/store';

export default function Profile() {
  const { userIdParam = '' } = useParams();
  const { userInfo } = useAppSelector((state) => state.user);
  const myId = userInfo ? userInfo._id : '';
  const { data: userReview, isLoading: isUserReviewLoading } = useUserReviewFetch(userIdParam);

  const isMyProfile = userIdParam === myId;
  if (isUserReviewLoading) return <Loading />;

  if (!isUserReviewLoading) {
    const reviews = userReview?.data?.reviews;

    return (
      <ResponsiveProvider
        direction={'col'}
        className={'gap-5 md:w-2/3 md:px-5 md:py-10 md:shadow-lg justify-start'}
      >
        <article className='flex flex-col justify-start w-full gap-5'>
          <ProfileImage />
          <ProfileInfo name={userInfo.displayName} isMyProfile={isMyProfile} />
          <ProfileScore name={userInfo.displayName} />
        </article>
        <CardWrapProvider
          isHover={true}
          title={`${userInfo.displayName}님이 쓰신 리뷰`}
          cardList={reviews}
        />
      </ResponsiveProvider>
    );
  }
}
