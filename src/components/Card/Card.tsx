import React from 'react';
import CardImage from './CardImage';
import CardHover from './CardHover';

import { formatDateWithTime } from '../../shared/util/regs';

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
  // 다른 필드들에 대한 정의...
};

type CardProps = {
  content: TContent;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isHover?: boolean;
};

const Card: React.FC<CardProps> = ({ content, onClick, isHover }) => {
  const { formattedMonthEnd } = formatDateWithTime(content.release_date);
  const [cardHover, setCardHover] = React.useState(false);
  const cardMouseOver = () => {
    setCardHover(true);
  };

  return (
    <div
      onClick={onClick}
      onMouseOver={cardMouseOver}
      onMouseLeave={() => setCardHover(false)}
      className='relative hover:scale-105 transition-all rounded-md cursor-pointer py-2 shadow-lg'
    >
      {cardHover && <CardHover review={content.lineReview} />}
      {isHover && <CardHover review={content.lineReview} />}
      <div
        className={`text-center flex gap-2 flex-col md:w-[card-img-w] w-[card-img-sm-w] transition-1s`}
      >
        <CardImage
          path={content.contentPosterImg || content.poster_path || content.backdrop_path}
        />
        <p className='whitespace-nowrap	overflow-hidden text-ellipsis text-lg	z-10'>
          {content.title || content.contentName}
        </p>

        {content.vote_average === 0 ? (
          <p className='text-sm z-10'>별점 정보가 없네요</p>
        ) : (
          <p className='text-sm z-10 flex gap-1 w-full items-center justify-center'>
            <span>⭐</span>
            <span className='text-yellow-500'>
              {content.grade || (content.vote_average / 2).toFixed(1)}
            </span>
          </p>
        )}
        <p className='text-sm z-10'>
          <span className='text-violet-500'>{content.userName || formattedMonthEnd}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
