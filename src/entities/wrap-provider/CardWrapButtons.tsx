import React from 'react';

export default function CardWrapButtons({ cardContainerRef }) {
  const handleScroll = (direction: string) => {
    const scrollAmount = 600;
    const cardContainer = cardContainerRef.current;

    if (cardContainer) {
      if (direction === 'left') {
        cardContainer.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
        cardContainer.scrollLeft += scrollAmount;
      }
    }
  };
  return (
    <div className='w-full'>
      <figure className='absolute inset-y-0 left-0 z-20 rounded-full opacity-50 flex items-center justify-center hover:opacity-80 transition-all'>
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
      </figure>
      <figure className='absolute inset-y-0 right-0 z-20 rounded-full opacity-50 flex items-center justify-center hover:opacity-80 transition-all'>
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
      </figure>
    </div>
  );
}
