import { useMutation } from '@tanstack/react-query';
import { reviewCreate } from '../../api/API';

const useReviewCreate = () => {
  return useMutation({
    mutationFn: reviewCreate,
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useReviewCreate;
