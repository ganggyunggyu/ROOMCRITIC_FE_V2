import React from 'react';
import { BANNER_IMAGES } from '@public/constant/BANNER_INFO';
import LeftChevrom from '../../../shared/icons/LeftChevrom';
import RightChevrom from '../../../shared/icons/RightChevrom';

type BannerBackgroundImageProps = {
  bannerIndex: number;
  setBannerIndex: React.Dispatch<React.SetStateAction<number>>;
};

const BannerBackgroundImage: React.FC<BannerBackgroundImageProps> = ({ bannerIndex, setBannerIndex }) => {
  const [carouselInterval, setCarouselInterval] = React.useState<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % BANNER_IMAGES.length);
    }, 5000);
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
        paddingBottom: '56.25%',
        transition: 'background-image 500ms ease-in-out',
        minHeight: '250px',
      }}
    >
      <div className="flex h-full justify-between items-center">
        <button
          onClick={(e) => {
            prevBannerButton(e);
          }}
          title="left-move-btn"
          className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-12 z-10"
        >
          <LeftChevrom />
        </button>
        <button
          onClick={(e) => {
            nextBannerButton(e);
          }}
          title="right-move-btn"
          className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-12"
        >
          <RightChevrom />
        </button>
      </div>
      <div className="pb-7 pr-10 flex gap-3 absolute bottom-0 right-0">
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
