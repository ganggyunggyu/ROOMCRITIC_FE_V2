import { useMutation } from '@tanstack/react-query';
import { reviewUpdate } from '../../api/API';

const useReviewUpdate = () => {
  return useMutation({
    mutationFn: reviewUpdate,

    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      console.log('결과에 관계 없이 무언가 실행됨');
    },
  });
};

export default useReviewUpdate;
