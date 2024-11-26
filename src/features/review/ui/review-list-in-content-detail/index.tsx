import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from '../card';
import { Button } from '@/shared';

interface Review {
  _id: string;
  userId: string;
  contentId: string;
  userName: string;
  lineReview: string;
  longReview?: string;
  grade: number;
  contentPosterImg: string;
  contentBackdropImg: string;
  contentName: string;
  contentType: string;
  like?: number;
}

interface ReviewListProps {
  contentTitle: string;
  reviews: Review[];
}

export const ReviewListInContentDetail: React.FC<ReviewListProps> = ({ contentTitle, reviews }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full rounded-lg flex flex-col gap-5">
      <p className="text-2xl w-full relative flex items-center">
        {contentTitle}에 남겨진 리뷰들
        <Button
          onClick={() => {
            navigate(`/content/reviews/${reviews[0].contentId}`);
          }}
          label="더 보기"
          variant="main"
          className="absolute right-0 top-0"
        />
      </p>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-10">
        {reviews.map((review) => (
          <Card key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};
