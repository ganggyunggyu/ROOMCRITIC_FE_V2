import React from 'react';
import StarIcon from '../shared/icons/StarIcon';
import HalfStar from '../shared/icons/HalfStar';

export default function Stars({ grade }: { grade: number }) {
  const GRADES = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  const hoverIndex = grade * 2 - 1;
  return (
    <section className='relative flex transition-all'>
      {GRADES.map((GRADE, i) => {
        return (
          <React.Fragment key={GRADE}>
            {i % 2 ? (
              <article className='transition-all'>
                <StarIcon color={`${hoverIndex >= i ? '#a38cf3' : 'white'}`} />
              </article>
            ) : (
              <React.Fragment>
                {i === 0 && (
                  <article className='absolute transition-all '>
                    <HalfStar color={`${hoverIndex >= i ? '#a38cf3' : 'white'}`} />
                  </article>
                )}
                {i === 2 && (
                  <article className='absolute translate-x-14 transition-all '>
                    <HalfStar color={`${hoverIndex >= i ? '#a38cf3' : 'white'}`} />
                  </article>
                )}
                {i === 4 && (
                  <article className='absolute translate-x-28 transition-all '>
                    <HalfStar color={`${hoverIndex >= i ? '#a38cf3' : 'white'}`} />
                  </article>
                )}
                {i === 6 && (
                  <article
                    style={{ transform: 'translateX(10.5rem)' }}
                    className='absolute translate-x-42 transition-all '
                  >
                    <HalfStar color={`${hoverIndex >= i ? '#a38cf3' : 'white'}`} />
                  </article>
                )}
                {i === 8 && (
                  <article className='absolute translate-x-56 transition-all '>
                    <HalfStar color={`${hoverIndex >= i ? '#a38cf3' : 'white'}`} />
                  </article>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        );
      })}
    </section>
  );
}
