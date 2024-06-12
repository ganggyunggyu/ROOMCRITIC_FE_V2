import React from 'react';
import Stars from '../../../shared/ui/Stars';
import Loading from '../../../shared/ui/Loading';
import { useAverageGradeByContent } from '../api';

export const Grade: React.FC = () => {
  const { data, isLoading } = useAverageGradeByContent();

  if (isLoading) return <Loading />;

  return (
    <div className='flex flex-col md:flex-row gap-4 items-center  md:absolute bottom-0'>
      <div className='flex flex-row md:flex-col gap-2 items-center'>
        <p>평균 별점</p>
        <p>
          {data.averageGrade}점 ({data.length}개)
        </p>
      </div>
      <Stars grade={+data.averageGrade} />
    </div>
  );
};
