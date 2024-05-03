import React, { useState } from 'react';

type TContent = {
  title?: string;
  contentName?: string;
  release_date: string;
  lineReview?: string;
  grade?: number;
  vote_average: number;
  userName?: string;
  contentPosterImg: string;
  poster_path: string;
  backdrop_path: string;
  review: string;
};

type CardReviewProps = {
  content: TContent;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const CardReview: React.FC<CardReviewProps> = ({ content, onClick }) => {
  const [cardHover, setCardHover] = useState(false);
  const cardMouseOver = () => {
    setCardHover(true);
  };
  return (
    <div onClick={onClick} onMouseOver={cardMouseOver} onMouseLeave={() => setCardHover(false)}>
      {cardHover ? <p className={` absolute z-10 text-white p-1`}>{content.review}</p> : null}

      <div className={`w-64 h-80 text-center border shadow-md`}>
        <img className='w-full h-5/6' src={content.contentPosterImg} alt='' />
        <div className='p-3'>
          <p>
            {content.userName} 평론가님의 <span className='text-red-400'>한줄평</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardReview;
