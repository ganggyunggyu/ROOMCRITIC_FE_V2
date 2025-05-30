import React from 'react';

import { Content } from '@/entities';
import { ContentListButtons } from '../content-list-button';
import { Card } from '../card';
import { Loading, cn } from '@/shared';

type CardWrapProviderProps = {
  title: string;
  cardList: Content[];
  observeTargetRef?: React.Ref<HTMLDivElement>; // ref 타입 지정
};

export const ContentList: React.FC<CardWrapProviderProps> = ({
  title,
  cardList,
  observeTargetRef,
  ...props
}) => {
  const cardContainerRef = React.useRef<HTMLDivElement>(null);
  if (cardList?.length === 0)
    return <p className="p-10">작품이 없습니다. 🥲</p>;

  if (cardList?.length !== 0) {
    return (
      <section className={cn(`w-full relative z-10 py-3 md:py-5`)} {...props}>
        <ContentListButtons cardContainerRef={cardContainerRef} />
        <p className="md:text-3xl text-lg">{title}</p>

        <article
          ref={cardContainerRef}
          className="flex overflow-x-scroll overflow-y-hidden gap-5 py-5 smooth-scroll"
        >
          {cardList?.map((content, index) => {
            const isLastCard = index === cardList.length - 1;
            ``;
            return (
              <Card
                ref={isLastCard ? observeTargetRef : null}
                key={content._id}
                content={content}
              />
            );
          })}
        </article>
      </section>
    );
  }

  return <Loading />;
};
