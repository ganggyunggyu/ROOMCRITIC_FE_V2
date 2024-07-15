import React from 'react';
import { cn } from '../../../shared/lib/cn';
import Loading from '../../../shared/ui/Loading';
import { ContentListButtons } from './ContentListButtons';
import Card from './card';
import { TCardContent } from '../../../shared/types/main';

type CardWrapProviderProps = {
  title: string;
  cardList: TCardContent[];
  observeTargetRef?: React.Ref<HTMLDivElement>; // ref 타입 지정
};

export const ContentList: React.FC<CardWrapProviderProps> = ({
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
      <ContentListButtons cardContainerRef={cardContainerRef} />
      <p className='md:text-3xl text-lg'>{title}</p>

      <article
        ref={cardContainerRef}
        className='flex overflow-x-scroll overflow-y-hidden gap-5 py-5 smooth-scroll'
      >
        {cardList.map((content, index) => {
          const isLastCard = index === cardList.length - 1;
          return (
            <Card ref={isLastCard ? observeTargetRef : null} key={content._id} content={content} />
          );
        })}
      </article>
    </section>
  );
};
