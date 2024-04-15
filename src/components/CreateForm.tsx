import React from 'react';
import useReviewCreate from '../hooks/review/useReviewCreate';
import { useRecoilValue } from 'recoil';
import { isDarkModeState, userInfoState } from '../store/atoms';
import Input from './AtomComponent/Input';
import Stars from './Stars';
import Button from './AtomComponent/Button';
import useFormInput from '../hooks/useFormInput';
import { getGradeText } from '../util/getGradeText';
import { TContent } from '../types/main';

interface CreateFormProps {
  content: TContent;
}

const CreateForm: React.FC<CreateFormProps> = ({ content }) => {
  const isDarkMode = useRecoilValue(isDarkModeState);
  const userInfo = useRecoilValue(userInfoState);
  const [grade, setGrade] = React.useState(0);
  const reviewInput = useFormInput('');

  const reviewData = {
    userId: userInfo._id,
    userName: userInfo.displayName,
    lineReview: reviewInput.value,
    longReview: '',
    grade: grade,
    contentPosterImg: `https://www.themoviedb.org/t/p/original${content.poster_path}`,
    contentBackdropImg: `https://www.themoviedb.org/t/p/original${content.backdrop_path}`,
    contentName: content.title,
    contentId: content._id,
    contentType: content.content_type,
  };

  const { mutate, isError, error, isSuccess } = useReviewCreate(reviewData);

  return (
    <React.Fragment>
      <Stars grade={grade} setGrade={setGrade} />

      {grade === 0 && (
        <p className='text-lg'>
          <span className={isDarkMode ? `text-yellow-400` : `text-yellow-500`}>별</span>을 클릭해서
          평점을 선택해주세요 !
        </p>
      )}
      {grade !== 0 && (
        <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
          {getGradeText(grade)}
        </p>
      )}
      <Input
        label={'한줄평 작성'}
        className='w-full mt-0'
        type='text'
        value={reviewInput.value}
        onChange={reviewInput.onChange}
      />

      <Button label='발행' bg='main' onClick={() => mutate(reviewData)} />
      {isSuccess && (
        <p className=''>
          리뷰 작성이 완료되었어요! <span className='animate-bounce'>👇</span>
        </p>
      )}
      {isError && <p>{error.message}</p>}
    </React.Fragment>
  );
};
export default CreateForm;
