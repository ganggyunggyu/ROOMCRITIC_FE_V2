import React from 'react';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';

type UseIntersectionObserverProps = {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
};

export const useIntersectionObserver = ({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: UseIntersectionObserverProps) => {
  const observeTargetRef = React.useRef<HTMLDivElement>(null);

  const observerCallback: IntersectionObserverCallback = React.useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
          console.log('next');
        }
      });
    },
    [hasNextPage, fetchNextPage],
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    if (observeTargetRef.current) {
      observer.observe(observeTargetRef.current);
    }

    return () => {
      if (observeTargetRef.current) {
        observer.unobserve(observeTargetRef.current);
      }
    };
  }, [observerCallback, threshold, fetchNextPage]);

  return observeTargetRef;
};
