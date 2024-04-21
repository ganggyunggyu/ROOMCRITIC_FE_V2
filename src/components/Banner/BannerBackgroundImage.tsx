import React from 'react';
import LeftChevrom from '../../shared/icons/LeftChevrom';
import RightChevrom from '../../shared/icons/RightChevrom';
import { BANNER_IMAGES } from '../../../public/banner-infos';

type BannerBackgroundImageProps = {
  bannerIndex: number;
  setBannerIndex: React.Dispatch<React.SetStateAction<number>>;
};

const BannerBackgroundImage: React.FC<BannerBackgroundImageProps> = ({
  bannerIndex,
  setBannerIndex,
}) => {
  const [carouselInterval, setCarouselInterval] = React.useState<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % BANNER_IMAGES.length);
    }, 3000);
    setCarouselInterval(interval);

    return () => {
      if (carouselInterval) {
        clearInterval(carouselInterval);
      }
    };
  }, [bannerIndex, setBannerIndex]);

  const bannerButton = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
    setBannerIndex(i);
    e.preventDefault();
  };

  const nextBannerButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBannerIndex((prevIndex) => (prevIndex + 1) % BANNER_IMAGES.length);
    e.preventDefault();
  };

  const prevBannerButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBannerIndex((prevIndex) => (prevIndex - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length);
    e.preventDefault();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${BANNER_IMAGES[bannerIndex]})`,
        backgroundSize: '100% 100%',
        position: 'relative',
        width: '100vw',
        height: '40vw',
        transition: 'background-image 500ms ease-in-out',
      }}
    >
      <div className='flex h-full justify-between items-center'>
        <button
          onClick={(e) => {
            prevBannerButton(e);
          }}
          title='left-move-btn'
        >
          <LeftChevrom />
        </button>
        <button
          onClick={(e) => {
            nextBannerButton(e);
          }}
          title='right-move-btn'
        >
          <RightChevrom />
        </button>
      </div>
      <div className='pb-7 pr-10 flex gap-3 absolute bottom-0 right-0'>
        {BANNER_IMAGES.map((_, i) => {
          return (
            <button
              key={i}
              onClick={(e) => {
                bannerButton(e, i);
              }}
              title={`banner-select-${i + 1}-btn`}
              className={`w-2 h-2 rounded-full transition-1s ${
                bannerIndex === i ? 'bg-slate-200 w-8' : 'bg-slate-600'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BannerBackgroundImage;
