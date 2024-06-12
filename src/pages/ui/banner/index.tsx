import React from 'react';
import BannerReview from './BannerReview';
import BannerBackgroundImage from './BannerBackgroundImage';
import { BANNER_REVIEWS } from '../../../../constant/BANNER_INFO';
export const Banner = () => {
  const [bannerIndex, setBannerIndex] = React.useState(0);
  return (
    <div className='relative'>
      <BannerBackgroundImage bannerIndex={bannerIndex} setBannerIndex={setBannerIndex} />
      <BannerReview review={BANNER_REVIEWS[bannerIndex]} />
    </div>
  );
};
