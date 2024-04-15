import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { userInfoState } from '../store/atoms';
import { useRecoilValue } from 'recoil';
import StarIcon from '../icons/StarIcon';
import Button from '../components/AtomComponent/Button';
import DetailBackground from '../components/DetailBackground';
import useReviewSelect from '../hooks/review/useReviewSelect';
import Loading from '../components/Loading';
import useReviewUpdate from '../hooks/review/useReviewUpdate';

export default function Update() {
  const userInfo = useRecoilValue(userInfoState);
  const { userId = '', reviewId = '' } = useParams();
  const { selectReviewQuery } = useReviewSelect(userId, reviewId);

  const [review, setReview] = useState(
    selectReviewQuery.isLoading ? '' : selectReviewQuery.data?.data.review.lineReview,
  );
  // const [addReview, setAddReview] = useState(
  //   selectReviewQuery.isLoading ? '' : selectReviewQuery.data?.data.review.longReview,
  // );
  const [grade, setGrade] = useState(
    selectReviewQuery.isLoading ? 3 : selectReviewQuery.data?.data.review.grade,
  );
  const updateData = {
    userId: userId,
    reviewId: reviewId,
    lineReview: review,
    // longReview: addReview,
    grade: grade,
  };

  const { updateMutate } = useReviewUpdate(updateData);

  const stars = [1, 2, 3, 4, 5];
  const isGrade = (star: number) => {
    setGrade(star);
  };

  return (
    <React.Fragment>
      {selectReviewQuery.isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <DetailBackground path={selectReviewQuery.data?.data.review.backdrop_path} />
          <div className='w-full flex flex-col justify-center items-center text-center z-10 pb-20'>
            <div className='w-10/12 sm:w-6/12 flex flex-col justify-center items-center'>
              <h1 className='text-4xl pt-10 pb-5'>
                {selectReviewQuery.data?.data.review.title ||
                  selectReviewQuery.data?.data.review.name}
              </h1>
              <p className='text-3xl pb-5'>
                {selectReviewQuery.data?.data.review.contentName} 리뷰 수정
              </p>
              <div className='flex items-center justify-center gap-1'>
                {stars.map((star, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        isGrade(star);
                      }}
                    >
                      <StarIcon color={'yellow'} />
                    </div>
                  );
                })}
              </div>
              <div className='pt-5'>
                <span>
                  {userInfo.displayName}님의 평점 <span className='text-red-400'>{grade}점!</span>
                </span>
              </div>
              <div className='py-5 w-full'>
                <input
                  className='w-full text-center text-zinc-900 bg-slate-100 p-2 rounded-md shadow-md'
                  placeholder='한줄평 쓰기'
                  type='text'
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                  // onKeyDown={(e) => {
                  //   if (e.key === 'Enter') {
                  //     e.preventDefault();
                  //     createMutate.mutate();
                  //   }
                  // }}
                />
              </div>
              {/* <div className='w-full py-5'>
                <textarea
                  className='w-full text-center h-80 text-zinc-900 bg-slate-100 p-2 rounded-md shadow-md'
                  placeholder='긴평 쓰기'
                  value={addReview}
                  onChange={(e) => {
                    setAddReview(e.target.value);
                  }}
                  // onKeyDown={(e) => {
                  //   if (e.key === 'Enter') {
                  //     e.preventDefault();
                  //     createMutate.mutate();
                  //   }
                  // }}
                />
              </div> */}
              <div className='w-full flex'>
                <div className='grow' />
                <Button label={'수정'} bg={'main'} onClick={() => updateMutate.mutate()} />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
