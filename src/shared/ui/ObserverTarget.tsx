import React, { useEffect, RefObject } from 'react';

interface ObserveTargetProps {
  observeTargetRef: RefObject<HTMLDivElement>;
  onIntersect: () => void;
}

const ObserveTarget: React.FC<ObserveTargetProps> = ({ observeTargetRef, onIntersect }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 1.0 },
    );

    if (observeTargetRef.current) {
      observer.observe(observeTargetRef.current);
    }

    return () => {
      if (observeTargetRef.current) {
        observer.unobserve(observeTargetRef.current);
      }
    };
  }, [observeTargetRef, onIntersect]);

  return <div ref={observeTargetRef} style={{ height: '1px' }} />;
};

export default ObserveTarget;
