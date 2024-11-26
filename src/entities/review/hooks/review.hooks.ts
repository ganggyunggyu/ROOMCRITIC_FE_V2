import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  getAverageGradeByContent,
  getReview,
  getReviewByContent,
  getReviewByContentTemp,
  getReviewByUser,
  getReviewLikeStatus,
  reviewCreate,
  reviewDelete,
  reviewDislike,
  reviewLike,
  reviewUpdate,
} from '../api';
import { useAppSelector } from '@/shared/store';
getAverageGradeByContent;

export const useAverageGradeByContent = () => {
  const { contentIdParam } = useParams();
  return useQuery({
    queryKey: ['average', contentIdParam],
    queryFn: () => getAverageGradeByContent(contentIdParam),
    select: (data) => data.data,
  });
};

export const useReviewByContentTemp = () => {
  const { contentIdParam } = useParams();
  return useQuery({
    queryKey: ['tempReview', contentIdParam],
    queryFn: () => getReviewByContentTemp(contentIdParam),
    select: (data) => data.data,
  });
};
export const useReviewByContent = () => {
  const { contentIdParam } = useParams();
  return useInfiniteQuery({
    queryKey: ['reviews', contentIdParam],
    queryFn: ({ pageParam }) => getReviewByContent(contentIdParam, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, allPages) => {
      console.log(lastPage, pages, allPages);
      if (lastPage) return allPages + 10;
    },
    select: (data) => {
      return data.pages;
    },
  });
};

export const useReviewDetail = () => {
  const { userIdParam, reviewIdParam } = useParams();
  return useQuery({
    queryKey: ['detailReview', userIdParam, reviewIdParam],
    queryFn: () => getReview(reviewIdParam),
    select: (data) => data.data,
  });
};

export const useReviewByUser = () => {
  const { userIdParam } = useParams();
  return useInfiniteQuery({
    queryKey: ['reviews', userIdParam],
    queryFn: ({ pageParam }) => getReviewByUser(userIdParam, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, allPages) => {
      console.log(lastPage, pages, allPages);
      if (lastPage) return allPages + 6;
    },
    select: (data) => {
      return data.pages;
    },
  });
};

export const useReviewDelete = () => {
  return useMutation({
    mutationFn: reviewDelete,
  });
};

export const useReviewCreate = () => {
  return useMutation({
    mutationFn: reviewCreate,
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useReviewUpdate = () => {
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

export const useGetReviewLikeStatus = () => {
  const { userIdParam, reviewIdParam } = useParams();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  return useQuery({
    queryKey: ['like', reviewIdParam, userIdParam],
    queryFn: () => getReviewLikeStatus(reviewIdParam, userInfo.userId),
    select: (data) => data.data,
  });
};

export const useReviewLike = () => {
  return useMutation({
    mutationFn: reviewLike,
  });
};

export const useReviewDislike = () => {
  return useMutation({
    mutationFn: reviewDislike,
  });
};
