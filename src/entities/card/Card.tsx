import React from 'react';
import CardImage from './CardImage';
import CardHover from './CardHover';
import CardInfo from './CardInfo';
import { TCardContent } from '../../app/types/main';
import { useNavigate } from 'react-router-dom';
import { formatMonth } from '../../shared/lib';

type CardProps = {
  content: TCardContent;
};

const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> =
  React.forwardRef(({ content }, ref) => {
    const navigator = useNavigate();
    const formattedMonthEnd = formatMonth(content.releaseDate);
    const [cardHover, setCardHover] = React.useState(false);

    const redirectContent = () => {
      navigator(`/content/${content._id}`);
    };

    const cardMouseOver = () => {
      setCardHover(true);
    };
    const cardMouseLeave = () => {
      setCardHover(false);
    };
    return (
      <figure
        ref={ref}
        onClick={redirectContent}
        onMouseOver={cardMouseOver}
        onMouseLeave={cardMouseLeave}
        className='relative hover:scale-105 hover:ring-4 hover:ring-zinc-700 rounded-md cursor-pointer transition-all'
      >
        {cardHover && <CardHover review={content.title} />}

        <div className={`text-center flex gap-2 flex-col md:w-[card-img-w] w-[card-img-sm-w]`}>
          <CardImage path={content.posterPath} />
          <CardInfo
            title={content.title}
            grade={(content.voteAverage / 2).toFixed(2)}
            etc={formattedMonthEnd}
          />
        </div>
      </figure>
    );
  });

export default Card;
