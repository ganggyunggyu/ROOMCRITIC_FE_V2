import React from 'react';
import Stars from '../../../shared/ui/stars';
import Loading from '../../../shared/ui/loading';
import { useAverageGradeByContent } from '@/entities';

export const Grade: React.FC = () => {
  const { data, isLoading } = useAverageGradeByContent();

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <p>평균 별점</p>
        <p>
          {data.averageGrade}점 ({data.length}개)
        </p>
      </div>
      <Stars grade={+data.averageGrade} />
    </div>
  );
};
