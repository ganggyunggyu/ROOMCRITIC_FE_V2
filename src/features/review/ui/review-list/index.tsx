import React from 'react';
import { ReviewCard } from '../card';
import { cn } from '@/shared';
import { Review } from '@/entities';

interface ReviewListProps {
  reviews: Review[];
  title: string;
  className?: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  title,
  className,
}) => {
  return (
    <div className="w-full rounded-lg flex flex-col gap-5">
      <p className="text-2xl">{title}</p>
      <div
        className={cn(
          `grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3`,
          className,
        )}
      >
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};
