import { useMutation } from '@tanstack/react-query';
import { sendLikeReview } from '../../../shared/api/api';

export const useReviewLike = () => {
  return useMutation({
    mutationFn: sendLikeReview,
  });
};
