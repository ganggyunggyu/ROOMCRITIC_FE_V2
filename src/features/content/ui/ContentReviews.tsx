import React from 'react';
import { useParams } from 'react-router-dom';
import { useReviewByContent } from '../../review/hooks/hooks';
import { useIntersectionObserver } from '../../../shared/hooks/common/useIntersectionObserver';
import { ReviewCard } from '../../../entities/review/ui/ReviewCard';
import { TReview } from '../../../app/types/main';

export const ContentReviews: React.FC = () => {
  const { contentIdParam = '' } = useParams();
  console.log(contentIdParam);
  const { data, hasNextPage, fetchNextPage, isSuccess, isLoading } = useReviewByContent();
  const observeTargetRef = useIntersectionObserver({ hasNextPage, fetchNextPage });

  if (isLoading) return <div />;

  if (isSuccess) {
    return (
      <div className=' w-10/12 grid grid-cols-1 gap-10'>
        {data.map((group, i) => {
          return group ? (
            <React.Fragment key={i}>
              {group.map((review: TReview) => {
                return <ReviewCard review={review} key={review._id} className='w-full h-72' />;
              })}
            </React.Fragment>
          ) : (
            <div className='py-5' key={i}>
              <p className='text-center'>모든 리뷰를 불러왔습니다.</p>
            </div>
          );
        })}
        <div ref={observeTargetRef}></div>
      </div>
    );
  }
};
