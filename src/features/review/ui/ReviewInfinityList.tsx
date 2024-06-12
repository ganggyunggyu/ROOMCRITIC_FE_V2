import React from 'react';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';

import { useIntersectionObserver } from '../../../shared/hooks/common/useIntersectionObserver';
import { TReview } from '../../../app/types/main';
import { cn } from '../../../shared/lib/cn';
import { Review } from '../../../entities';

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
                  return <Review.U.Card review={review} key={review._id} className='w-full h-72' />;
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
