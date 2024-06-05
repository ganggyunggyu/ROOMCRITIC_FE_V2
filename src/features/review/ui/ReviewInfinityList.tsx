import React from 'react';
import { useIntersectionObserver } from '../../../shared/hooks/common/useIntersectionObserver';
import { ReviewCard } from '../../../entities/review/ui/ReviewCard';
import { TReview } from '../../../app/types/main';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { cn } from '../../../shared/lib/cn';

type ReviewInfinityListProps = {
  query: () => InfiniteQueryObserverResult<TReview[][]>;
  title: string;
  className?: string;
};

export const ReviewInfinityList: React.FC<ReviewInfinityListProps> = ({
  query,
  title,
  className,
}) => {
  const { data, hasNextPage, fetchNextPage, isSuccess, isLoading } = query();
  const observeTargetRef = useIntersectionObserver({ hasNextPage, fetchNextPage });

  if (isLoading) return <div />;

  if (isSuccess) {
    return (
      <React.Fragment>
        <p>{title}</p>
        <div className={cn('w-full grid grid-cols-1 gap-10', className)}>
          {data.map((group, i) => {
            console.log(group);
            return group ? (
              <React.Fragment key={i}>
                {group.map((review: TReview) => {
                  return <ReviewCard review={review} key={review._id} className='w-full h-72' />;
                })}
              </React.Fragment>
            ) : (
              <div className='py-5' key={i}>
                <p className='text-center grid'>모든 리뷰를 불러왔습니다.</p>
              </div>
            );
          })}
          <div ref={observeTargetRef}></div>
        </div>
      </React.Fragment>
    );
  }
};
