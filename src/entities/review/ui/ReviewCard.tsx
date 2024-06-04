import React from 'react';
import { TReview } from '../../../app/types/main';
import { FaRegCommentAlt, FaRegThumbsUp, FaStar } from 'react-icons/fa';
import { Button } from '../../../shared/ui';
import { cn } from '../../../shared/lib/cn';
import { useNavigate } from 'react-router-dom';

export type ReviewCardProps = {
  review: TReview;
  className?: string;
};

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, className }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/review/${review._id}/${review.userId}`);
  };

  return (
    <div
      key={review.userId + review.contentId + review._id}
      onClick={onClick}
      className={cn(
        `flex flex-row gap-3 border border-solid  border-slate-400 w-86 h-52 md:h-72 p-4 rounded-md dark:bg-zinc-700 bg-zinc-100 hover:bg-zinc-100 cursor-pointer ${className}`,
      )}
    >
      <div className='flex flex-col w-full gap-3 relative'>
        <div className='flex items-center justify-between w-full border-b border-b-slate-400 dark:border-b-slate-200 border-double pb-2'>
          <p className='text-xl'>{review.userName}</p>
          <div className='w-14 bg-slate-400 gap-1.5 py-2 px-2 flex items-center justify-center rounded-full text-yellow-400'>
            <FaStar />
            <strong className='text-slate-800'> {review.grade.toFixed(1)} </strong>
          </div>
        </div>
        <p className=' '>{review.lineReview}</p>
        <div className='flex flex-col gap-3 w-full absolute bottom-0'>
          <div className='flex gap-2'>
            <FaRegThumbsUp className=' hover:text-zinc-700 rounded-full cursor-pointer' />
            <span>{review.like}</span>
            <FaRegCommentAlt />
            <span>{review.like}</span>
          </div>
          <Button
            label='좋아요'
            children={
              <FaRegThumbsUp className=' hover:text-zinc-700 rounded-full cursor-pointer' />
            }
            variant='main'
          />
        </div>
      </div>
    </div>
  );
};
