import React from 'react';
import BannerReview from './BannerReview';
import { BANNER_REVIEWS } from '../../../public/constant/BANNER_INFO';
import BannerBackgroundImage from './BannerBackgroundImage';
const Banner = () => {
  const [bannerIndex, setBannerIndex] = React.useState(0);
  return (
    <div className='relative'>
      <BannerBackgroundImage bannerIndex={bannerIndex} setBannerIndex={setBannerIndex} />
      <BannerReview review={BANNER_REVIEWS[bannerIndex]} />
    </div>
  );
};

export default Banner;
