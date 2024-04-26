import React, { KeyboardEvent } from 'react';
import Input from '../atom-component/Input';
import Button from '../atom-component/Button';
import Loading from '../Loading';

import { useNavigate, useParams } from 'react-router-dom';
import useReviewUpdate from '../../shared/hooks/review/useReviewUpdate';
import { getGradeText } from '../../shared/util/getGradeText';
import StarsInput from '../StarsInput';
import DetailBackground from '../DetailBackground';
import useReviewDetail from '../../shared/hooks/review/useReviewDetail';

export default function UpdateForm() {
  const { userIdParam = '', reviewId = '' } = useParams();
  const navigator = useNavigate();
  const { mutate } = useReviewUpdate();

  const {
    isLoading: isReviewLoading,
    data: Review,
    isSuccess,
  } = useReviewDetail(userIdParam, reviewId);
  const [lineReview, setLineReview] = React.useState<string>(
    isSuccess ? Review.review.lineReview : '',
  );
  const [grade, setGrade] = React.useState<number>(isSuccess && Review.review.grade);

  const reviewUpdateDTO = {
    userId: userIdParam,
    reviewId: reviewId,
    lineReview: lineReview,
    grade: grade,
  };

  React.useEffect(() => {
    if (isSuccess) setLineReview(Review.lineReview);
  }, [isSuccess, Review]);
  if (isReviewLoading) return <Loading />;

  const updateMutate = () => {
    mutate(reviewUpdateDTO, {
      onSuccess: () => {
        console.log('수정 성공');
        navigator(`/detail/review/${reviewUpdateDTO.userId}/${reviewUpdateDTO.reviewId}`);
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

  const { review } = Review;

  return (
    <React.Fragment>
      <DetailBackground path={review.contentBackdropImg} />
      <p className='text-3xl'>{review.contentName} 리뷰 수정</p>
      <StarsInput grade={grade} setGrade={setGrade} />
      <span className='text-violet-400'>{getGradeText(grade)}</span>
      <form className='w-1/2 relative'>
        <Input
          placeholder='한줄평 쓰기'
          type='text'
          value={lineReview}
          onChange={(e) => {
            setLineReview(e.target.value);
          }}
          onKeyDown={handleEnterKeyPress}
          className='text-center'
        />
        <Button
          label={'수정'}
          bg={'main'}
          onClick={updateMutate}
          className='absolute right-0 top-3'
        />
      </form>
    </React.Fragment>
  );
}
