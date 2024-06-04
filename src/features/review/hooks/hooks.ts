import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getReview, getReviewByContent, getReviewByContentTemp, getReviewByUser } from './api';
import { useParams } from 'react-router-dom';

export const useReviewByContentTemp = (contentId) => {
  return useQuery({
    queryKey: ['tempReview', contentId],
    queryFn: () => getReviewByContentTemp(contentId),
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
