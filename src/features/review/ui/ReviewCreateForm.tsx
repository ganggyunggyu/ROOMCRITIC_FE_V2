import React, { KeyboardEvent, MouseEvent } from 'react';
import Input from '../../../shared/ui/Input';
import StarsInput from '../../../shared/ui/StarsInput';
import useFormInput from '../../../shared/hooks/common/useFormInput';
import { Button } from '../../../shared/ui/button/button';
import { getGradeText } from '../../../shared/lib/getGradeText';
import { TContent } from '../../../app/types/main';
import { ReviewCreateDTO } from '../../../app/types/dtos';
import { useAppSelector } from '../../../app/store';
import { H } from '..';

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
    contentPosterImg: content.posterPath,
    contentBackdropImg: content.backdropPath,
    contentName: content.title,
    contentId: content._id,
    contentType: content.contentType,
  };

  const { mutate, error, isSuccess, isError } = H.useReviewCreate();
  const { refetch } = H.useReviewByContentTemp();

  const successReviewCreate = () => {
    reviewInput.setValue('');
    refetch();
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
      <div className='relative'>
        <Input
          label={'한줄평 작성'}
          className='w-full mt-0'
          type='text'
          value={reviewInput.value}
          onChange={reviewInput.onChange}
          onKeyDown={handleEnterKeyPress}
        />

        <Button
          className='absolute right-0 top-2'
          type='button'
          label='발행'
          variant='main'
          onClick={handleReviewCreate}
        />
        {isSuccess && (
          <p className=''>
            리뷰 작성이 완료되었어요! <span className='animate-bounce'>👇</span>
          </p>
        )}
      </div>
      {isError && <p>{error.message}</p>}
    </form>
  );
};
export default CreateForm;
