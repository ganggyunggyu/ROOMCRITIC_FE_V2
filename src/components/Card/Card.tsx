import React from 'react';
import CardImage from './CardImage';
import CardHover from './CardHover';
import CardInfo from './CardInfo';
import { formatDateWithTime } from '../../shared/util/regs';
import { TCardContent } from '../../app/types/main';

type CardProps = {
  content: TCardContent;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isHover?: boolean;
};

const Card: React.FC<CardProps> = ({ content, onClick, isHover }) => {
  const { formattedMonthEnd } = formatDateWithTime(content.release_date);
  const [cardHover, setCardHover] = React.useState(false);

  const cardMouseOver = () => {
    setCardHover(true);
  };
  const cardMouseLeave = () => {
    setCardHover(false);
  };

  return (
    <figure
      onClick={onClick}
      onMouseOver={cardMouseOver}
      onMouseLeave={cardMouseLeave}
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
        <CardInfo
          title={content.title || content.contentName}
          grade={content.grade || (content.vote_average / 2).toFixed(2)}
          etc={content.userName || formattedMonthEnd}
        />
      </div>
    </figure>
  );
};

export default Card;
