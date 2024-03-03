import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { userInfoState } from '../store/atoms';
import { useRecoilValue } from 'recoil';
import StarIcon from '../icons/StarIcon';
import Button from '../components/AtomComponent/Button';
import DetailBackground from '../components/DetailBackground';

import Loading from '../components/Loading';
import useReviewCreate from '../hooks/review/useReviewCreate';
import useContentFetch from '../hooks/content/useContentFetch';
import Input from '../components/AtomComponent/Input';
export default function Create() {
  const userInfo = useRecoilValue(userInfoState);
  const { contentType = '', contentId = '' } = useParams();
  const { detailContentQuery } = useContentFetch(contentType, contentId);

  const [review, setReview] = useState('');
  const [addReview, setAddReview] = useState('');
  const [grade, setGrade] = useState(3);
  const stars = [1, 2, 3, 4, 5];

  const isGrade = (star: number) => {
    setGrade(star);
  };

  const content = detailContentQuery.data?.data.content;
  const reviewData = {
    userId: userInfo._id,
    userName: userInfo.displayName,
    lineReview: review,
    longReview: addReview,
    grade: grade,
    contentPosterImg: `https://www.themoviedb.org/t/p/original${content.poster_path}`,
    contentBackdropImg: `https://www.themoviedb.org/t/p/original${content.backdrop_path}`,
    contentName: content.title,
    contentId: content._id,
    contentType: content.content_type,
  };

  const { createMutate } = useReviewCreate(reviewData, setReview);

  return (
    <React.Fragment>
      {detailContentQuery.isLoading ? (
        <Loading></Loading>
      ) : (
        <React.Fragment>
          <DetailBackground path={content.backdrop_path} />
          <div className='w-full flex flex-col justify-center items-center text-center z-10 pb-20'>
            <div className='w-10/12 sm:w-6/12 flex flex-col justify-center items-center'>
              <h1 className='text-4xl pt-10 pb-5'>{content.title}</h1>
              <p className='text-3xl pb-5'>감상평을 쓰자</p>
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
                <Input
                  label={'한줄평'}
                  className=''
                  type='text'
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      createMutate.mutate();
                    }
                  }}
                />
              </div>
              <div className='w-full py-5'>
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
              </div>
              <div className='w-full flex'>
                <div className='grow' />

                <Button
                  label={'발행'}
                  bg={'main'}
                  // @ts-expect-error
                  onClick={createMutate.mutate}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
