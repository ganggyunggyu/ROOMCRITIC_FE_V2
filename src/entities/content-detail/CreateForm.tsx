import React, { KeyboardEvent, MouseEvent } from 'react';
import useReviewCreate from '../../shared/hooks/review/useReviewCreate';
import Input from '../../shared/ui/Input';
import StarsInput from '../../shared/ui/StarsInput';

import { Button } from '../../shared/ui/button/button';
import useFormInput from '../../shared/hooks/common/useFormInput';
import { getGradeText } from '../../shared/lib/getGradeText';
import { TContent } from '../../app/types/main';
import { ReviewCreateDTO } from '../../app/types/dtos';
import useContentReviews from '../../shared/hooks/content/useContentReviews';
import { useAppSelector } from '../../app/store';

interface CreateFormProps {
  content: TContent;
}

const CreateForm: React.FC<CreateFormProps> = ({ content }) => {
  const { userInfo } = useAppSelector((state) => state.user);
  const { isDarkMode } = useAppSelector((state) => state.darkMode);
  const [grade, setGrade] = React.useState(0);
  const reviewInput = useFormInput('');

  const reviewCreateDTO: ReviewCreateDTO = {
    userId: userInfo._id,
    userName: userInfo.displayName,
    lineReview: reviewInput.value,
    grade: grade,
    contentPosterImg: content.poster_path,
    contentBackdropImg: content.backdrop_path,
    contentName: content.title,
    contentId: content._id,
    contentType: content.content_type,
  };

  const { mutate, error, isSuccess, isError } = useReviewCreate();
  const { refetch: reviewsRefetch } = useContentReviews(
    reviewCreateDTO.contentType,
    reviewCreateDTO.contentId,
  );

  const successReviewCreate = () => {
    reviewInput.setValue('');
    reviewsRefetch();
  };
  const handleEnterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      reviewInput.setValue('');
      mutate(reviewCreateDTO, { onSuccess: successReviewCreate });
    }
  };
  const handleReviewCreate = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    reviewInput.setValue('');
    mutate(reviewCreateDTO, { onSuccess: successReviewCreate });
  };

  return (
    <form className='flex flex-col gap-5'>
      <StarsInput grade={grade} setGrade={setGrade} />
      {grade === 0 && (
        <p className='text-lg'>
          <span className={``}>별</span>을 클릭해서 평점을 선택해주세요 !
        </p>
      )}
      {grade !== 0 && (
        <p className={isDarkMode ? 'text-yellow-300' : 'text-yellow-500'}>{getGradeText(grade)}</p>
      )}
      <Input
        label={'한줄평 작성'}
        className='w-full mt-0'
        type='text'
        value={reviewInput.value}
        onChange={reviewInput.onChange}
        onKeyDown={handleEnterKeyPress}
      />

      <Button type='button' label='발행' bg='main' onClick={handleReviewCreate} />
      {isSuccess && (
        <p className=''>
          리뷰 작성이 완료되었어요! <span className='animate-bounce'>👇</span>
        </p>
      )}
      {isError && <p>{error.message}</p>}
    </form>
  );
};
export default CreateForm;
