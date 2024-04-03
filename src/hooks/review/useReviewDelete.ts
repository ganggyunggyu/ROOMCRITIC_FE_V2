import { useMutation } from '@tanstack/react-query';
import axiosConfig from '../../api/AxiosConfig';
import { useNavigate } from 'react-router-dom';

const reviewDelete = async (reviewId: string, userId: string) => {
  const deleteData = {
    reviewId: reviewId,
    userId: userId,
  };

  try {
    const result = await axiosConfig.delete('review/delete', {
      data: deleteData,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error; // 에러를 호출하는 쪽으로 전파
  }
};

const useReviewDelete = (reviewId: string, userId: string) => {
  const navigator = useNavigate();
  const reviewDeleteMutate = useMutation({
    mutationFn: () => reviewDelete(reviewId, userId),
    onSuccess: () => {
      console.log('요청 성공');
      navigator(`/profile/${userId}`);
    },
    onError: () => {
      console.error('에러 발생');
    },
    onSettled: () => {
      console.log('결과에 관계 없이 무언가 실행됨');
    },
  });

  return { reviewDeleteMutate };
};

export default useReviewDelete;
