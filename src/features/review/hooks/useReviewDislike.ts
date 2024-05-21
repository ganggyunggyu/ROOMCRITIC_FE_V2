import { useMutation } from '@tanstack/react-query';
import { sendDislikeReview } from '../../../shared/api/api';

export const useReviewDislike = () => {
  return useMutation({
    mutationFn: sendDislikeReview,
  });
};
