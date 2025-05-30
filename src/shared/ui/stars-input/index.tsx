import React, { MouseEvent } from 'react';
import StarIcon from '../icons/StarIcon';
import HalfStar from '../icons/HalfStar';

type StarsInput = {
  grade: number;
  setGrade: React.Dispatch<React.SetStateAction<number>>;
};

export const StarsInput: React.FC<StarsInput> = ({ grade, setGrade }) => {
  const GRADES = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  const [hoverIndex, setHoverIndex] = React.useState(-1);
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    if (grade !== 0) setHoverIndex(grade * 2 - 1);
  }, []);

  return (
    <div className="relative flex transition-all">
      {GRADES.map((GRADE, i) => {
        const handleStarClick = (event: MouseEvent<HTMLDivElement>) => {
          event.preventDefault();
          setGrade(GRADE);
          setHoverIndex(i);
          setIsSelected(true);
        };
        const onStarHover = () => {
          setHoverIndex(i);
        };
        const onStarLeave = () => {
          if (!isSelected) setHoverIndex(-1);
          if (isSelected) setHoverIndex(grade * 2 - 1);
        };
        return (
          <React.Fragment key={GRADE}>
            {i % 2 ? (
              <div
                className=" transition-all cursor-pointer "
                onMouseOver={onStarHover}
                onMouseLeave={onStarLeave}
                onClick={handleStarClick}
              >
                <StarIcon color={`${hoverIndex >= i ? 'yellow' : 'white'}`} />
              </div>
            ) : (
              <React.Fragment>
                {i === 0 && (
                  <div
                    className="absolute  transition-all cursor-pointer "
                    onMouseOver={onStarHover}
                    onMouseLeave={onStarLeave}
                    onClick={handleStarClick}
                  >
                    <HalfStar
                      color={`${hoverIndex >= i ? 'yellow' : 'white'}`}
                    />
                  </div>
                )}
                {i === 2 && (
                  <div
                    className="absolute translate-x-14  transition-all cursor-pointer "
                    onMouseOver={onStarHover}
                    onMouseLeave={onStarLeave}
                    onClick={handleStarClick}
                  >
                    <HalfStar
                      color={`${hoverIndex >= i ? 'yellow' : 'white'}`}
                    />
                  </div>
                )}
                {i === 4 && (
                  <div
                    className="absolute translate-x-28  transition-all cursor-pointer "
                    onMouseOver={onStarHover}
                    onMouseLeave={onStarLeave}
                    onClick={handleStarClick}
                  >
                    <HalfStar
                      color={`${hoverIndex >= i ? 'yellow' : 'white'}`}
                    />
                  </div>
                )}
                {i === 6 && (
                  <div
                    style={{ transform: 'translateX(10.5rem)' }}
                    className="absolute translate-x-42  transition-all cursor-pointer "
                    onMouseOver={onStarHover}
                    onMouseLeave={onStarLeave}
                    onClick={handleStarClick}
                  >
                    <HalfStar
                      color={`${hoverIndex >= i ? 'yellow' : 'white'}`}
                    />
                  </div>
                )}
                {i === 8 && (
                  <div
                    className="absolute translate-x-56  transition-all cursor-pointer "
                    onMouseOver={onStarHover}
                    onMouseLeave={onStarLeave}
                    onClick={handleStarClick}
                  >
                    <HalfStar
                      color={`${hoverIndex >= i ? 'yellow' : 'white'}`}
                    />
                  </div>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
