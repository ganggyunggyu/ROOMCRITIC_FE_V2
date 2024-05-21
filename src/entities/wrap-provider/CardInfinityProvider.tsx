import React from 'react';
import Loading from '../../shared/ui/Loading';
import { cn } from '../../shared/lib/cn';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '../../shared/hooks/common/useIntersectionObserver';
import Card from '../card/Card';
import CardWrapButtons from './CardWrapButtons';
import { fetchTopRatedMovies } from '../../shared/api/api';
import { TCardContent } from '../../app/types/main';

type CardInfinityProviderProps = {
  title: string;
};

const CardInfinityProvider: React.FC<CardInfinityProviderProps> = ({ title, ...props }) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: ({ pageParam }) => fetchTopRatedMovies(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, allPages) => {
      return allPages + 10;
    },
    select: (data) => data.pages,
  });
  const cardContainerRef = React.useRef<HTMLDivElement>(null);

  const observeTargetRef = useIntersectionObserver({ hasNextPage, fetchNextPage });

  if (isLoading) return <Loading />;
  if (data.length === 0) return <p className='p-10'>작품이 없습니다. 🥲</p>;
  if (isSuccess) {
    return (
      <section className={cn(`w-full relative z-10 py-3 md:py-5`)} {...props}>
        <CardWrapButtons cardContainerRef={cardContainerRef} />
        <p className='md:text-3xl text-lg'>{title}</p>
        <article
          ref={cardContainerRef}
          className='flex overflow-x-scroll overflow-y-hidden gap-5 py-5 smooth-scroll relative'
        >
          {data.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group.map((card: TCardContent) => {
                  return <Card content={card} key={card._id} />;
                })}
              </React.Fragment>
            );
          })}
          <div className='w-12 h-full' ref={observeTargetRef}>
            무한!
          </div>
        </article>
      </section>
    );
  }
};

export default CardInfinityProvider;
