import { useMutation } from '@tanstack/react-query';
import axiosConfig from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const reviewCreate = async (createData) => {
  try {
    const result = await axiosConfig.post(
      'review/create',
      { createData },
      { withCredentials: true },
    );

    return result;
  } catch (err) {
    console.log(err);
  }
};

const useReviewCreate = (createData) => {
  const navigator = useNavigate();
  const createMutate = useMutation({
    mutationFn: () => reviewCreate(createData),
    onSuccess: () => {
      console.log('글쓰기 성공');
      navigator(`/content/${createData.contentType}/${createData.contentId}`);
    },
    onError: () => {
      console.error('에러 발생');
    },
    onSettled: () => {
      console.log('결과에 관계 없이 무언가 실행됨');
    },
  });

  return { createMutate };
};

export default useReviewCreate;
