import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/store';
import { FaRegCommentAlt, FaRegThumbsUp, FaStar } from 'react-icons/fa';
import { Review, useGetReviewLikeStatus, useReviewLike } from '@/entities';
import { cn } from '@/shared';

export interface ReviewCardProps {
  review: Review;
  className?: string;
}
type ReviewLikeRequest = {
  reviewId: string;
  userId: string;
};

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  className,
}) => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state?.user);
  const handleReviewClick = () => {
    navigate(`/review/${review._id}/${review.userId}`);
  };
  const { mutateAsync } = useReviewLike();

  const { data, isSuccess } = useGetReviewLikeStatus({
    reviewId: review._id,
    userId: review.userId,
  });
  const [isLike, setIsLike] = React.useState<boolean>(false);

  const handleReviewLikeClick = async () => {
    const reviewLikeRequest: ReviewLikeRequest = {
      reviewId: review._id,
      userId: userInfo._id,
    };
    setIsLike(!isLike);

    if (isLike) review.like--;
    if (!isLike) review.like++;

    try {
      await mutateAsync(reviewLikeRequest);
    } catch (error) {
      console.error(error);
      setIsLike(!isLike);
    }
  };

  React.useEffect(() => {
    if (isSuccess && data !== undefined) {
      setIsLike(data);
    }
  }, [isSuccess, data]);

  if (isSuccess)
    return (
      <div
        key={review.userId + review.contentId + review._id}
        className={cn(
          `relative flex flex-row gap-3 border border-solid  border-slate-400 w-86 h-52 md:h-72 p-4 rounded-md dark:bg-zinc-700 bg-zinc-100 hover:bg-zinc-100 cursor-pointer ${className}`,
        )}
      >
        <div
          onClick={handleReviewClick}
          className="flex flex-col w-full gap-3 relative"
        >
          <div className="flex items-center justify-between w-full border-b border-b-slate-400 dark:border-b-slate-200 border-double pb-2">
            <p className="text-xl">{review.userName}</p>
            <div className="w-14 bg-slate-400 gap-1.5 py-2 px-2 flex items-center justify-center rounded-full text-yellow-400">
              <FaStar />
              <strong className="text-slate-800">
                {' '}
                {review.grade.toFixed(1)}{' '}
              </strong>
            </div>
          </div>
          <p className=" ">{review.lineReview}</p>
        </div>
        <div className="flex flex-col gap-3 w-full absolute bottom-4">
          <div className="flex gap-2">
            <FaRegThumbsUp
              onClick={handleReviewLikeClick}
              className={`rounded-full cursor-pointer ${isLike ? 'fill-violet-500' : ''}`}
            />
            <span>{review.like}</span>
            <FaRegCommentAlt />
            {/* <span>{review.like}</span> */}
          </div>
        </div>
      </div>
    );
};
