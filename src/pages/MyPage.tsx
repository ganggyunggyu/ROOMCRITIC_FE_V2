import { userInfoState } from '../store/atoms';
import { useRecoilValue } from 'recoil';

import { useParams } from 'react-router-dom';

import CardWrapProvider from '../components/WrapProvider/CardWrapProvider';
import useMyReviewFetch from '../hooks/review/useMyReviewFetch';
import Loading from '../components/Loading';
import ResponsiveProvider from '../components/WrapProvider/ResponsiveProvider';
import axiosConfig from '../api/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import Button from '../components/AtomComponent/Button';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SettingIcon from '../icons/SettingIcon';

type GenreScore = {
  genre_id: number;
  genre_name: string;
  score: number;
  count: number;
  _id: string;
};

// type GenreScores = GenreScore[];

export default function MyPage() {
  const { userId = '' } = useParams();

  const userInfo = useRecoilValue(userInfoState);
  const { myReviewQuery } = useMyReviewFetch(userId);
  const { isLoading: isMyReviewLoading, data: myReviewData } = myReviewQuery;

  const fetchGenreScore = async () => {
    const result = axiosConfig.get(`/score/${userId}`);

    return result;
  };

  const { isLoading: isGenreScoreLoading, data: genreScoreData } = useQuery({
    queryKey: ['genreScore', userId],
    queryFn: fetchGenreScore,
  });

  if (isGenreScoreLoading && isMyReviewLoading) return <Loading />;

  if (!isGenreScoreLoading && !isMyReviewLoading) {
    const { reviewCount, genreScore } = genreScoreData?.data || {};
    const reviews = myReviewData?.data?.reviews;

    return (
      <ResponsiveProvider
        direction={'col'}
        className={'gap-5 md:w-2/3 md:px-5 md:py-10 md:shadow-lg justify-start'}
      >
        <div className='flex flex-col justify-start w-full gap-5'>
          <div className='flex justify-between'>
            <LazyLoadImage
              style={{ width: '150px', height: '150px' }}
              className='rounded-full'
              width={'150px'}
              height={'150px'}
              src='https://i.pinimg.com/564x/5c/a2/e6/5ca2e650b72d9f34f71c835762ee6722.jpg'
              alt='profile-img'
            />
            <Button item={<SettingIcon />} className={'h-12 w-12 hover:text-violet-400'} />
          </div>
          <p className='text-xl'>{userInfo.displayName}</p>
          <div className='flex gap-2'>
            <div className='flex gap-1'>
              <p>팔로워</p>
              <span>10</span>
            </div>
            <div className='flex gap-1'>
              <p>팔로잉</p>
              <span>10</span>
            </div>
          </div>
          <Button label={'팔로우'} bg={'main'} />
          <div className='flex gap-3'>
            <div className='text-center w-1/3'>
              <p className='text-lg font-bold'>{reviewCount}</p>
              <p className='border-violet-400'>리뷰</p>
            </div>
            <div className='text-center w-1/3'>
              <p className='text-lg font-bold'>{reviewCount}</p>
              <p>보고싶어요</p>
            </div>
            <div className='text-center w-1/3'>
              <p className='text-lg font-bold'>{reviewCount}</p>
              <p>봤어요</p>
            </div>
          </div>
          <p>{userInfo.displayName} 님의 취향 점수</p>
          <div className='flex flex-col gap-3'>
            {!genreScore && <div>리뷰 데이터가 부족해요 🥲</div>}
            {genreScore &&
              genreScore.map((el: GenreScore) => {
                return (
                  <div key={el.genre_id} className='flex gap-2 justify-between'>
                    <div className='flex items-center'>
                      <p className=''>{el.genre_name}</p>
                    </div>
                    <div className='flex gap-2'>
                      <p>
                        <span className='text-sm text-violet-400'> 취향 점수</span> {el.score}점
                      </p>
                      <p>
                        <span className='text-sm text-violet-400'> 리뷰 수</span>
                        {el.count}개
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <CardWrapProvider
          isHover={true}
          title={`${userInfo.displayName}님이 쓰신 리뷰`}
          cardList={reviews}
        />
      </ResponsiveProvider>
    );
  }
}
