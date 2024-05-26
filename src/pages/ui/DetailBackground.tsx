import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAppDispatch } from '../../app/store';
import { setBackgroundPath } from '../../app/store/slice/backgroundPath';

type DetailBackgroundProps = {
  path: string | null;
};

const DetailBackground: React.FC<DetailBackgroundProps> = ({ path }) => {
  const dispath = useAppDispatch();
  React.useEffect(() => {
    dispath(setBackgroundPath(path));
  }, [path]);

  if (path) {
    return (
      <div className='fixed top-0 opacity-20 w-screen h-screen z-0'>
        <LazyLoadImage
          key={path}
          className='h-full fixed top-0'
          src={`https://www.themoviedb.org/t/p/original/${path}`}
          loading='lazy'
          effect='blur'
          width={'100%'}
          height={'100%'}
        />
      </div>
    );
  }
};
export default DetailBackground;
