import React from 'react';
import { ReviewCard } from '../entities/review/ui/ReviewCard';
import { cn } from '../shared/lib/cn';

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
  reviews: Review[];
  title: string;
  className?: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, title, className }) => {
  return (
    <div className='w-full rounded-lg flex flex-col gap-5'>
      <p className='text-2xl'>{title}</p>
      <div className={cn(`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3`, className)}>
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
