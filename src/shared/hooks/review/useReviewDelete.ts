import { useMutation } from '@tanstack/react-query';
import { reviewDelete } from '../../api/API';

const useReviewDelete = () => {
  return useMutation({
    mutationFn: reviewDelete,
  });
};

export default useReviewDelete;
