import React from 'react';
import Card from '../card/Card';
import Loading from '../Loading';
import { cn } from '../../shared/util/cn';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../shared/util/scrollToTop';

type TContent = {
  id: string;
  _id: string;
  title?: string;
  userId?: string;
  contentName?: string;
  release_date: string;
  lineReview?: string;
  grade?: number;
  vote_average: number;
  userName?: string;
  contentPosterImg: string;
  poster_path: string;
  backdrop_path: string;
  content_type: string;
};

type CardWrapProviderProps = {
  title: string;
  cardList: TContent[];
  isHover?: boolean;
};

const CardWrapProvider: React.FC<CardWrapProviderProps> = ({
  title,
  cardList,
  isHover,
  ...props
}) => {
  const cardConatinerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (direction: string) => {
    const scrollAmount = 300;
    const cardContainer = cardConatinerRef.current;

    if (cardContainer) {
      if (direction === 'left') {
        cardContainer.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
        cardContainer.scrollLeft += scrollAmount;
      }
    }
  };
  const navigator = useNavigate();
  const redirectContent = (content: TContent) => {
    if (content.content_type && content._id) {
      navigator(`/content/${content.content_type}/${content._id}`);
    } else {
      navigator(`/detail/review/${content.userId}/${content._id}`);
    }
    scrollToTop();
  };

  if (!cardList) return <Loading />;
  if (!cardList.length && cardList.length !== 0) return <Loading />;
  if (cardList.length === 0) return <p>작품이 없습니다.</p>;

  return (
    <React.Fragment>
      <div className={cn(`w-full z-10 relative py-3 md:py-5`)} {...props}>
        <div className='absolute inset-y-0 left-0 z-20 rounded-full opacity-50 flex items-center justify-center hover:opacity-80 transition-all'>
          <button
            onClick={() => {
              handleScroll('left');
            }}
            title='card-left-btn'
            className='w-12 h-12 bg-slate-500 rounded-full flex items-center justify-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-8 h-8'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
            </svg>
          </button>
        </div>
        <div className='absolute inset-y-0 right-0 z-20 rounded-full opacity-50 flex items-center justify-center hover:opacity-80 transition-all'>
          <button
            onClick={() => {
              handleScroll('right');
            }}
            title='card-right-btn'
            className='w-12 h-12 bg-slate-500 rounded-full flex items-center justify-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-8 h-8'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
            </svg>
          </button>
        </div>
        <p className='md:text-3xl text-lg'>{title}</p>
        <div
          ref={cardConatinerRef}
          className='flex overflow-x-scroll overflow-y-hidden gap-5 py-5 smooth-scroll'
        >
          {cardList.map((content) => {
            return (
              <Card
                key={content.id || content._id}
                content={content}
                onClick={() => {
                  redirectContent(content);
                }}
                isHover={isHover}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};
export default CardWrapProvider;