import React from 'react';

import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { ReviewCard } from '../card';
import { useReviewByContent, Review } from '@/entities';

export const ContentReviews: React.FC = () => {
  const { data, hasNextPage, fetchNextPage, isSuccess, isLoading } = useReviewByContent();
  const observeTargetRef = useIntersectionObserver({ hasNextPage, fetchNextPage });

  if (isLoading) return <div />;

  if (isSuccess) {
    return (
      <div className=" w-10/12 grid grid-cols-1 gap-10">
        {data.map((group, i) => {
          return group ? (
            <React.Fragment key={i}>
              {group.map((review: Review) => {
                return <ReviewCard review={review} key={review._id} className="w-full h-72" />;
              })}
            </React.Fragment>
          ) : (
            <div className="py-5" key={i}>
              <p className="text-center">모든 리뷰를 불러왔습니다.</p>
            </div>
          );
        })}
        <div ref={observeTargetRef}></div>
      </div>
    );
  }
};
