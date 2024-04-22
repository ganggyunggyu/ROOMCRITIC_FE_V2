import { useMutation } from '@tanstack/react-query';
import { reviewCreate } from '../../api/API';

const useReviewCreate = () => {
  return useMutation({
    mutationFn: reviewCreate,
    // onSuccess: () => {
    //   console.log('글쓰기 성공');
    // },
    onError: (error) => {
      console.error(error);
    },
    // onSettled: () => {
    //   console.log('결과에 관계 없이 무언가 실행됨');
    // },
  });
};

export default useReviewCreate;
