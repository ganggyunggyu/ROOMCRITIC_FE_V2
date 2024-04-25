import React, { KeyboardEvent, MouseEvent } from 'react';
import useReviewCreate from '../shared/hooks/review/useReviewCreate';
import Input from './atom-component/Input';
import StarsInput from './StarsInput';

import Button from './atom-component/Button';
import useFormInput from '../shared/hooks/common/useFormInput';
import { getGradeText } from '../shared/util/getGradeText';
import { TContent } from '../app/types/main';
import { ReviewCreateDTO } from '../app/types/dtos';
import useSelectedContentReviews from '../shared/hooks/content/useSelectedContentReviewsQuery';
import { useAppSelector } from '../app/store';

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
    contentPosterImg: `https://www.themoviedb.org/t/p/original${content.poster_path}`,
    contentBackdropImg: `https://www.themoviedb.org/t/p/original${content.backdrop_path}`,
    contentName: content.title,
    contentId: content._id,
    contentType: content.content_type,
  };

  const { mutate, error, isSuccess, isError } = useReviewCreate();
  const { selectedContentReviewsQuery } = useSelectedContentReviews(
    reviewCreateDTO.contentType,
    reviewCreateDTO.contentId,
  );

  const successReviewCreate = () => {
    reviewInput.setValue('');
    selectedContentReviewsQuery.refetch();
  };
  const handleEnterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      mutate(reviewCreateDTO, { onSuccess: successReviewCreate });
    }
  };
  const handleReviewCreate = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
