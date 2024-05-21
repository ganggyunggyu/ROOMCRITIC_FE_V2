import { useMutation } from '@tanstack/react-query';
import { reviewDelete } from '../../api/api';

const useReviewDelete = () => {
  return useMutation({
    mutationFn: reviewDelete,
  });
};

export default useReviewDelete;
