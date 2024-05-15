import React from 'react';
import Loading from '../../shared/ui/Loading';
import { useParams } from 'react-router-dom';
import useUserInfoFetch from '../../shared/hooks/user/useUserInfoFetch';

type GenreScore = {
  genreId?: number;
  genreName: string;
  score: number;
  count: number;
  _id: string;
};

type ProfileScoreProps = {
  // name: string;
};

const ProfileScore: React.FC<ProfileScoreProps> = () => {
  const { userIdParam = '' } = useParams();
  const { score, isScoreLoading, userInfo, isUserInfoLoading } = useUserInfoFetch(userIdParam);

  if (isScoreLoading || isUserInfoLoading) return <Loading />;

  if (!isScoreLoading || !isUserInfoLoading) {
    const { userInfo: info } = userInfo;

    return (
      <React.Fragment>
        <div className='flex gap-3'>
          <div className='text-center w-1/3'>
            <p className='text-lg font-bold'>{info.reviewCount}</p>
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
        <p>{info.displayName} 님의 취향 점수</p>
        <div className='flex flex-col gap-3'>
          {!score && <div>리뷰 데이터가 부족해요 🥲</div>}
          {score &&
            score.map((el: GenreScore) => {
              return (
                <div key={el._id} className='flex gap-2 justify-between'>
                  <div className='flex items-center'>
                    <p className=''>{el.genreName}</p>
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
