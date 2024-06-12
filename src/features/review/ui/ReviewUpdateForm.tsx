import React, { KeyboardEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../shared/ui/Input';
import Loading from '../../../shared/ui/Loading';
import StarsInput from '../../../shared/ui/StarsInput';
import { Button } from '../../../shared/ui/button/button';
import { getGradeText } from '../../../shared/lib/getGradeText';
import { useReviewDetail, useReviewUpdate } from '../api/hooks';

export function UpdateForm() {
  const { userIdParam = '', reviewIdParam = '' } = useParams();
  const navigator = useNavigate();
  const { mutate } = useReviewUpdate();

  const { isLoading: isReviewLoading, data: review, isSuccess } = useReviewDetail();
  const [lineReview, setLineReview] = React.useState<string>(isSuccess ? review.lineReview : '');
  const [grade, setGrade] = React.useState<number>(isSuccess ? review.grade : 3);

  const reviewUpdateDTO = {
    userId: userIdParam,
    reviewId: reviewIdParam,
    lineReview: lineReview,
    grade: grade,
  };

  React.useEffect(() => {
    if (isSuccess) setLineReview(review.lineReview);
  }, [isSuccess, review]);

  if (isReviewLoading) return <Loading />;

  const updateMutate = () => {
    mutate(reviewUpdateDTO, {
      onSuccess: () => {
        console.log('수정 성공');
        navigator(`/review/${reviewUpdateDTO.reviewId}/${reviewUpdateDTO.userId}`);
      },
    });
  };

  const handleEnterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      updateMutate();
    }
  };

  return (
    <React.Fragment>
      <p className='text-3xl'>{review.contentName} 리뷰 수정</p>
      <StarsInput grade={grade} setGrade={setGrade} />
      <span className='text-violet-400'>{getGradeText(grade)}</span>
      <form className='w-1/2 relative'>
        <Input
          placeholder='한줄평 쓰기'
          type='text'
          value={lineReview}
          onChange={(e) => {
            e.preventDefault();

            setLineReview(e.target.value);
          }}
          onKeyDown={handleEnterKeyPress}
          className='text-center'
        />
        <Button
          label={'수정'}
          variant={'main'}
          onClick={updateMutate}
          className='absolute right-0 top-3'
        />
      </form>
    </React.Fragment>
  );
}
