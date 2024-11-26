import 'react-lazy-load-image-component/src/effects/blur.css';
import React from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAppDispatch } from '../../app/store';
import { setBackgroundPath } from '../../app/store/slice/backgroundPath';

type DetailBackgroundProps = {
  path: string | null;
};

export const DetailBackground: React.FC<DetailBackgroundProps> = ({ path }) => {
  const dispath = useAppDispatch();
  React.useEffect(() => {
    dispath(setBackgroundPath(path));
  }, [path, dispath]);

  if (path) {
    return (
      <div className="fixed opacity-20 w-screen video transition-all top-0">
        <LazyLoadImage
          key={path}
          className="w-screen h-screen -z-10"
          src={`https://www.themoviedb.org/t/p/original/${path}`}
          loading="lazy"
          effect="blur"
          width={'100%'}
          height={'100%'}
        />
      </div>
    );
  }
};
