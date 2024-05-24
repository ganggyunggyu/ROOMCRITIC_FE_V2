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
          <div
            className='flex items-center justify-center md:w-[card-img-w] w-[card-img-sm-w] px-10'
            ref={observeTargetRef}
          >
            <Loading />
            {/* <div className='border border-blue-300 shadow rounded-md p-4 w-full h-full'>
              <div className='animate-pulse flex space-x-4'>
                <div className='rounded-full bg-slate-700 h-10 w-full'></div>
                <div className='flex-1 space-y-6 py-1'>
                  <div className='h-10 bg-slate-700 rounded'></div>
                  <div className='space-y-3'>
                    <div className='grid grid-cols-3 gap-4'>
                      <div className='h-8 bg-slate-700 rounded col-span-2'></div>
                      <div className='h-8 bg-slate-700 rounded col-span-1'></div>
                    </div>
                    <div className='h-8 bg-slate-700 rounded'></div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </article>
      </section>
    );
  }
};

export default CardInfinityProvider;
