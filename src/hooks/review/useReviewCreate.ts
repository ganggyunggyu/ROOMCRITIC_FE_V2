import { useMutation } from '@tanstack/react-query';
import axiosConfig from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import useSelectedContentReviews from '../content/useSelectedContentReviewsQuery';
import { useState } from 'react';

type createData = {
  userId: string;
  userName: string;
  lineReview: string;
  longReview: string;
  grade: number;
  contentPosterImg: string;
  contentBackdropImg: string;
  contentName: string;
  contentId: string;
  contentType: string;
};

const reviewCreate = async (createData: createData, setReview) => {
  try {
    const result = await axiosConfig.post(
      'review/create',
      { createData },
      { withCredentials: true },
    );
    console.log(result);
    return result; // 서버 응답 데이터의 내용만 반환합니다.
  } catch (err) {
    throw new Error('Failed to update user data');
  }
};

const useReviewCreate = (
  createData: createData,
  setReview: React.Dispatch<React.SetStateAction<string>>,
) => {
  const [isWritingCompleted, setIsWritingCompleted] = useState(false);

  const { selectedContentReviewsQuery } = useSelectedContentReviews(
    createData.contentType,
    createData.contentId,
  );

  const createMutate = useMutation({
    // @ts-expect-error

    mutationFn: () => reviewCreate(createData),
    onSuccess: () => {
      console.log('글쓰기 성공');
      setIsWritingCompleted(true);
      selectedContentReviewsQuery.refetch();
      setReview('');
    },
    onError: () => {
      console.error('에러 발생');
    },
    onSettled: () => {
      console.log('결과에 관계 없이 무언가 실행됨');
    },
  });

  return { createMutate, isWritingCompleted };
};

export default useReviewCreate;
