import React from 'react';
import useReviewCreate from '../hooks/review/useReviewCreate';
import { useRecoilValue } from 'recoil';
import { isDarkModeState, userInfoState } from '../store/atoms';
import Input from './AtomComponent/Input';
import Stars from './Stars';
import Button from './AtomComponent/Button';
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
  const isDarkMode = useRecoilValue(isDarkModeState);
  const userInfo = useRecoilValue(userInfoState);
  const [grade, setGrade] = React.useState(0);
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

  return (
    <React.Fragment>
      <Stars grade={grade} setGrade={setGrade} />

      {grade === 0 ? (
        <p className='text-lg'>
          <span className={isDarkMode ? `text-yellow-400` : `text-yellow-500`}>별</span>을 클릭해서
          평점을 선택해주세요 !
        </p>
      ) : (
        <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-800'} `}>
          {grade === 0.5 && <span>최악이에요</span>}
          {grade === 1 && <span>싫어요</span>}
          {grade === 1.5 && <span>재미없어요</span>}
          {grade === 2 && <span>별로에요</span>}
          {grade === 2.5 && <span>부족해요</span>}
          {grade === 3 && <span>보통이에요</span>}
          {grade === 3.5 && <span>볼만해요</span>}
          {grade === 4 && <span>재미있어요</span>}
          {grade === 4.5 && <span>훌륭해요!</span>}
          {grade === 5 && <span>최고에요!</span>}
        </p>
      )}
      <Input
        label={'한줄평 작성'}
        className='w-full mt-0'
        type='text'
        value={review}
        onChange={(e) => {
          setReview(e.target.value);
        }}
      />

      <Button label='발행' bg='main' onClick={() => createMutate.mutate()} />
      {isWritingCompleted && (
        <p className=''>
          리뷰 작성이 완료되었어요! <span className='animate-bounce'>👇</span>
        </p>
      )}
    </React.Fragment>
  );
};
export default CreateForm;
