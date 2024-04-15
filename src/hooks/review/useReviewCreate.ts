import { useMutation } from '@tanstack/react-query';
import { TReviewCreateDTO } from '../../types/main';
import { reviewCreate } from '../../api/API';
import useSelectedContentReviews from '../content/useSelectedContentReviewsQuery';

const useReviewCreate = (reviewCreateDTO: TReviewCreateDTO) => {
  const { selectedContentReviewsQuery } = useSelectedContentReviews(
    reviewCreateDTO.contentType,
    reviewCreateDTO.contentId,
  );

  return useMutation({
    mutationFn: reviewCreate,
    onSuccess: () => {
      console.log('글쓰기 성공');
      selectedContentReviewsQuery.refetch();
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      console.log('결과에 관계 없이 무언가 실행됨');
    },
  });
};

export default useReviewCreate;
