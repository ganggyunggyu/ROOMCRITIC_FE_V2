import React from 'react';

export default function CardInfo({ title, grade, etc }) {
  if (grade === 'NaN') grade = 0.0;
  const getGradeInfo = (grade: number) => {
    if (grade === 0.0) return '별점 정보가 없네요.';

    return grade;
  };

  return (
    <React.Fragment>
      <p className='whitespace-nowrap	overflow-hidden text-ellipsis text-lg	z-10'>{title}</p>
      <p className='text-sm z-10 flex gap-1 w-full items-center justify-center'>
        <span>⭐</span>
        <span className='text-yellow-500'>{getGradeInfo(grade)}</span>
      </p>
      <span className='text-sm z-10 text-violet-500'>{etc}</span>
    </React.Fragment>
  );
}
