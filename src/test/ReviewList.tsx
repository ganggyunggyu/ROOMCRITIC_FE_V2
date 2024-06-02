import React from 'react';

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
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className='w-full rounded-lg flex flex-col gap-5'>
      <p className='text-2xl'>남겨진 리뷰들</p>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3'>
        {reviews.map((review) => (
          <div
            key={review.userId + review.contentId + review._id}
            className='flex flex-row gap-3 border border-solid border-slate-400 w-86 h-44 p-3 rounded-md'
          >
            <div className='w-42 h-42'>
              <img
                src={`https://www.themoviedb.org/t/p/original/${review.contentPosterImg}`}
                alt={`${review.contentName} poster`}
                className='w-full h-full rounded-md shadow-md'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <h3 className=''>{review.userName}</h3>
              <p className=' font-bold '>
                {review.contentName} <span className='text-sm '>{review.contentType}</span>
              </p>
              <p className=' '>
                <strong></strong> {review.lineReview}
              </p>
              {review.longReview && (
                <p className=' '>
                  <strong>Long Review:</strong> {review.longReview}
                </p>
              )}
              <p className=' '>
                <strong>⭐ {review.grade} </strong>
              </p>
              <p className=' '>
                <strong>👍</strong> {review.like}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
