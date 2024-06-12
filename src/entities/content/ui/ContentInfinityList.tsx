import React from 'react';
import Card from './card';
import Loading from '../../../shared/ui/Loading';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { cn } from '../../../shared/lib/cn';
import { useIntersectionObserver } from '../../../shared/hooks/common/useIntersectionObserver';
import { TCardContent } from '../../../app/types/main';
import { ContentListButtons } from './ContentListButtons';
type TInfinityContent = TCardContent[];
type CardInfinityProviderProps = {
  title: string;
  query: () => InfiniteQueryObserverResult<TInfinityContent[]>;
};

export const ContentInfinityList: React.FC<CardInfinityProviderProps> = ({
  title,
  query,
  ...props
}) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess } = query();
  const cardContainerRef = React.useRef<HTMLDivElement>(null);

  const observeTargetRef = useIntersectionObserver({ hasNextPage, fetchNextPage });

  if (isLoading) return <Loading />;
  if (data.length === 0) return <p className='p-10'>작품이 없습니다. 🥲</p>;
  if (isSuccess) {
    return (
      <section className={cn(`w-full relative z-10 py-3 md:py-5`)} {...props}>
        <ContentListButtons cardContainerRef={cardContainerRef} />
        <p className='md:text-3xl text-lg'>{title}</p>
        <article
          ref={cardContainerRef}
          className='flex overflow-x-scroll overflow-y-hidden gap-5 py-5 smooth-scroll relative'
        >
          {data.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group ? (
                  group.map((card: TCardContent) => {
                    return <Card content={card} key={card._id} />;
                  })
                ) : (
                  <div />
                )}
              </React.Fragment>
            );
          })}
          <div
            className='flex items-center justify-center md:w-[card-img-w] w-[card-img-sm-w] px-10'
            ref={observeTargetRef}
          >
            <Loading />
          </div>
        </article>
      </section>
    );
  }
};
