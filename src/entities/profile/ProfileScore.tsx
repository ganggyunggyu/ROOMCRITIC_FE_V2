import React from 'react';
import Loading from '../../shared/ui/Loading';
import { useParams } from 'react-router-dom';
import useUserInfoFetch from '../../shared/hooks/auth/useUserInfoFetch';
import useAuth from '../../shared/hooks/auth/useAuth';

type GenreScore = {
  genre_id: number;
  genre_name: string;
  score: number;
  count: number;
  _id: string;
};

type ProfileScoreProps = {
  // name: string;
};

const ProfileScore: React.FC<ProfileScoreProps> = () => {
  const { userIdParam = '' } = useParams();
  const { Score, isScoreLoading } = useUserInfoFetch(userIdParam);
  const { displayName } = useAuth();
  if (isScoreLoading) return <Loading />;

  if (!isScoreLoading) {
    const { reviewCount, genreScore } = Score;

    return (
      <React.Fragment>
        <div className='flex gap-3'>
          <div className='text-center w-1/3'>
            <p className='text-lg font-bold'>{reviewCount}</p>
            <p className='border-violet-400'>리뷰</p>
          </div>
          <div className='text-center w-1/3'>
            <p className='text-lg font-bold'>0</p>
            <p>보고싶어요</p>
          </div>
          <div className='text-center w-1/3'>
            <p className='text-lg font-bold'>0</p>
            <p>봤어요</p>
          </div>
        </div>
        <p>{displayName} 님의 취향 점수</p>
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
      </React.Fragment>
    );
  }
};
export default ProfileScore;
