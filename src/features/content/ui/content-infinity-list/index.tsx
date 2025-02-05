import React from 'react';

import { Loading } from '../../../../shared/ui/loading';
import {
  InfiniteQueryObserverResult,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { cn } from '../../../../shared/lib/cn';
import { useIntersectionObserver } from '../../../../shared/hooks/use-intersection-observer';
import { Content, InfinityQueryContentResponse } from '@/entities';
import { ContentListButtons } from '../content-list-button';
import { Card } from '../card';
import { AxiosResponse } from 'axios';

type CardInfinityProviderProps = {
  title: string;
  // query: () => UseInfiniteQueryResult<UseInfiniteQueryResult, Error>;
  query: any;
};

export const ContentInfinityList: React.FC<CardInfinityProviderProps> = ({
  title,
  query,
  ...props
}) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess } = query();
  const cardContainerRef = React.useRef<HTMLDivElement>(null);

  const observeTargetRef = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  if (isLoading) return <Loading />;
  if (data.length === 0) return <p className="p-10">작품이 없습니다. 🥲</p>;

  if (isSuccess) {
    const { pages } = data;
    const isEndPages = pages.at(-1).data.contentList.length < 10;

    return (
      <section className={cn(`w-full relative z-10 py-3 md:py-5`)} {...props}>
        <ContentListButtons cardContainerRef={cardContainerRef} />
        <p className="md:text-3xl text-lg">{title}</p>
        <article
          ref={cardContainerRef}
          className="flex overflow-x-scroll overflow-y-hidden gap-5 py-5 smooth-scroll relative"
        >
          {pages.map(
            (
              group: AxiosResponse<InfinityQueryContentResponse>,
              index: number,
            ) => {
              const contentList = group.data.contentList;
              return (
                <React.Fragment key={index}>
                  {contentList ? (
                    contentList.map((card) => {
                      return <Card content={card} key={card._id} />;
                    })
                  ) : (
                    <div />
                  )}
                </React.Fragment>
              );
            },
          )}
          {!isEndPages && (
            <div
              className="flex items-center justify-center md:w-[card-img-w] w-[card-img-sm-w] px-10"
              ref={observeTargetRef}
            >
              <Loading />
            </div>
          )}
        </article>
      </section>
    );
  }
};
