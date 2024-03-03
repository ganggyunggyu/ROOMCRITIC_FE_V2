import React from 'react';

import StarIcon from '../icons/StarIcon';
import useReviewCreate from '../hooks/review/useReviewCreate';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../store/atoms';
import Input from './AtomComponent/Input';

interface Content {
  _id: string;
  title: string;
  content_type: string;
  poster_path: string;
  backdrop_path: string;
}

interface CreateFormProps {
  content: Content;
}

const CreateForm: React.FC<CreateFormProps> = ({ content }) => {
  const userInfo = useRecoilValue(userInfoState);
  const [grade, setGrade] = React.useState(3);
  const [review, setReview] = React.useState('');

  const reviewData = {
    userId: userInfo._id,
    userName: userInfo.displayName,
    lineReview: review,
    longReview: '',
    grade: grade,
    contentPosterImg: `https://www.themoviedb.org/t/p/original${content.poster_path}`,
    contentBackdropImg: `https://www.themoviedb.org/t/p/original${content.backdrop_path}`,
    contentName: content.title,
    contentId: content._id,
    contentType: content.content_type,
  };

  const { createMutate, isWritingCompleted } = useReviewCreate(reviewData, setReview);
  const { mutate } = createMutate;

  const stars = [1, 2, 3, 4, 5];
  const isGrade = (star: number) => {
    setGrade(star);
  };

  const buttonConfig = {
    label: '발행',
    bg: 'main',
    onClick: mutate,
  };
  return (
    <React.Fragment>
      <div className='flex items-center justify-center gap-3 w-full z-20'>
        {stars.map((star, i) => {
          return (
            <div
              className='cursor-pointer'
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
      <span>
        {userInfo.displayName}님의 평점 <span className='text-violet-400'>{grade}점!</span>
      </span>
      <Input
        label={'한줄평 작성'}
        className='w-full'
        type='text'
        value={review}
        onChange={(e) => {
          setReview(e.target.value);
        }}
        // onKeyDown={(e) => {
        //   if (e.key === 'Enter') {
        //     e.preventDefault();
        //     mutate();
        //   }
        // }}
        // @ts-expect-error
        buttonConfig={buttonConfig}
      />
      {isWritingCompleted && (
        <div>
          <p className=''>
            리뷰 작성이 완료되었어요! <span className='animate-bounce'>👇</span>
          </p>
        </div>
      )}
    </React.Fragment>
  );
};
export default CreateForm;
