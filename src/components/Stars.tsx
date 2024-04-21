import React from 'react';
import StarIcon from '../shared/icons/StarIcon';
import HalfStar from '../shared/icons/HalfStar';

export default function Stars({ hoverIndex }: { hoverIndex: number }) {
  const GRADES = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  return (
    <div className='relative flex transition-all'>
      {GRADES.map((GRADE, i) => {
        return (
          <React.Fragment key={GRADE}>
            {i % 2 ? (
              <div className='transition-all'>
                <StarIcon color={`${hoverIndex >= i ? '#a38cf3' : 'white'}`} />
              </div>
            ) : (
              <React.Fragment>
                {i === 0 && (
                  <div className='absolute transition-all '>
                    <HalfStar color={`${hoverIndex >= i ? '#a38cf3' : 'white'}`} />
                  </div>
                )}
                {i === 2 && (
                  <div className='absolute translate-x-14 transition-all '>
                    <HalfStar color={`${hoverIndex >= i ? '#a38cf3' : 'white'}`} />
                  </div>
                )}
                {i === 4 && (
                  <div className='absolute translate-x-28 transition-all '>
                    <HalfStar color={`${hoverIndex >= i ? '#a38cf3' : 'white'}`} />
                  </div>
                )}
                {i === 6 && (
                  <div
                    style={{ transform: 'translateX(10.5rem)' }}
                    className='absolute translate-x-42 transition-all '
                  >
                    <HalfStar color={`${hoverIndex >= i ? '#a38cf3' : 'white'}`} />
                  </div>
                )}
                {i === 8 && (
                  <div className='absolute translate-x-56 transition-all '>
                    <HalfStar color={`${hoverIndex >= i ? '#a38cf3' : 'white'}`} />
                  </div>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
