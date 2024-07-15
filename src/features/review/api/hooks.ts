import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../shared/store';

import * as A from './api';

export const useReviewByContentTemp = () => {
  const { contentIdParam } = useParams();
  return useQuery({
    queryKey: ['tempReview', contentIdParam],
    queryFn: () => A.getReviewByContentTemp(contentIdParam),
    select: (data) => data.data,
  });
};
export const useReviewByContent = () => {
  const { contentIdParam } = useParams();
  return useInfiniteQuery({
    queryKey: ['reviews', contentIdParam],
    queryFn: ({ pageParam }) => A.getReviewByContent(contentIdParam, pageParam),
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
    queryFn: () => A.getReview(reviewIdParam),
    select: (data) => data.data,
  });
};

export const useReviewByUser = () => {
  const { userIdParam } = useParams();
  return useInfiniteQuery({
    queryKey: ['reviews', userIdParam],
    queryFn: ({ pageParam }) => A.getReviewByUser(userIdParam, pageParam),
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
    mutationFn: A.reviewDelete,
  });
};

export const useReviewCreate = () => {
  return useMutation({
    mutationFn: A.reviewCreate,
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useReviewUpdate = () => {
  return useMutation({
    mutationFn: A.reviewUpdate,

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
    queryFn: () => A.getReviewLikeStatus(reviewIdParam, userInfo.userId),
    select: (data) => data.data,
  });
};

export const useReviewLike = () => {
  return useMutation({
    mutationFn: A.reviewLike,
  });
};

export const useReviewDislike = () => {
  return useMutation({
    mutationFn: A.reviewDislike,
  });
};
