import React, { KeyboardEvent } from 'react';
import Input from '../AtomComponent/Input';
import Button from '../AtomComponent/Button';
import Loading from '../Loading';
import useReviewSelect from '../../shared/hooks/review/useReviewSelect';
import { useParams } from 'react-router-dom';
import useReviewUpdate from '../../shared/hooks/review/useReviewUpdate';
import { getGradeText } from '../../shared/util/getGradeText';
import StarsInput from '../StarsInput';

export default function UpdateForm() {
  const { userId = '', reviewId = '' } = useParams();
  const { selectReviewQuery } = useReviewSelect(userId, reviewId);
  const [review, setReview] = React.useState(
    selectReviewQuery.isLoading ? '' : selectReviewQuery.data?.data.review.lineReview,
  );

  const [grade, setGrade] = React.useState(
    selectReviewQuery.isLoading ? 3 : selectReviewQuery.data?.data.review.grade,
  );
  const updateData = {
    userId: userId,
    reviewId: reviewId,
    lineReview: review,
    grade: grade,
  };

  const { updateMutate } = useReviewUpdate(updateData);

  const handleEnterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      updateMutate.mutate();
    }
  };
  if (selectReviewQuery.isLoading) return <Loading />;

  return (
    <React.Fragment>
      <StarsInput grade={grade} setGrade={setGrade} />
      <span className='text-violet-400'>{getGradeText(grade)}</span>
      <form className='w-1/2 relative flex flex-col gap-5'></form>
      <form className='w-1/2 relative'>
        <Input
          placeholder='한줄평 쓰기'
          type='text'
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
          onKeyDown={handleEnterKeyPress}
          className='text-center'
        />
        <Button
          label={'수정'}
          bg={'main'}
          onClick={() => updateMutate.mutate()}
          className='absolute right-0 top-4'
        />
      </form>
    </React.Fragment>
  );
}
