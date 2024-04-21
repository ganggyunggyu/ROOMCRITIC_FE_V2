import { userInfoState } from '../shared/store/atoms';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import CardWrapProvider from '../components/WrapProvider/CardWrapProvider';
import useMyReviewFetch from '../shared/hooks/review/useMyReviewFetch';
import Loading from '../components/Loading';
import ResponsiveProvider from '../components/WrapProvider/ResponsiveProvider';
import ProfileImage from '../components/Profile/ProfileImage';
import ProfileInfo from '../components/Profile/ProfileInfo';
import ProfileScore from '../components/Profile/ProfileScore';

//쓴 리뷰를 위한 정보 userId
//취향점수를 위한 정보 userId

export default function Profile() {
  const { userId = '' } = useParams();

  const userInfo = useRecoilValue(userInfoState);
  const { myReviewQuery } = useMyReviewFetch(userId);
  const { isLoading: isMyReviewLoading, data: myReviewData } = myReviewQuery;

  if (isMyReviewLoading) return <Loading />;

  if (!isMyReviewLoading) {
    const reviews = myReviewData?.data?.reviews;

    return (
      <ResponsiveProvider
        direction={'col'}
        className={'gap-5 md:w-2/3 md:px-5 md:py-10 md:shadow-lg justify-start'}
      >
        <article className='flex flex-col justify-start w-full gap-5'>
          <ProfileImage />
          <ProfileInfo name={userInfo.displayName} />
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
