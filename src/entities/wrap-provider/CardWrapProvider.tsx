import React from 'react';
import Card from '../card/Card';
import Loading from '../../shared/ui/Loading';
import { cn } from '../../shared/lib/cn';
import { TCardContent } from '../../app/types/main';
import CardWrapButtons from './CardWrapButtons';
// import axios from 'axios';

type CardWrapProviderProps = {
  title: string;
  cardList: TCardContent[];
  isHover?: boolean;
  observeTargetRef?: React.Ref<HTMLDivElement>; // ref 타입 지정
};

const CardWrapProvider: React.FC<CardWrapProviderProps> = ({
  title,
  cardList,
  observeTargetRef,
  ...props
}) => {
  const cardContainerRef = React.useRef<HTMLDivElement>(null);

  if (!cardList) return <Loading />;
  if (!cardList.length && cardList.length !== 0) return <Loading />;
  if (cardList.length === 0) return <p className='p-10'>작품이 없습니다. 🥲</p>;

  return (
    <section className={cn(`w-full relative z-10 py-3 md:py-5`)} {...props}>
      <CardWrapButtons cardContainerRef={cardContainerRef} />
      <p className='md:text-3xl text-lg'>{title}</p>
      <article
        ref={cardContainerRef}
        className='flex overflow-x-scroll overflow-y-hidden gap-5 py-5 smooth-scroll'
      >
        {cardList.map((content, index) => {
          const isLastCard = index === cardList.length - 1;
          return <Card ref={isLastCard ? observeTargetRef : null} key={index} content={content} />;
        })}
      </article>
    </section>
  );
};
export default CardWrapProvider;
