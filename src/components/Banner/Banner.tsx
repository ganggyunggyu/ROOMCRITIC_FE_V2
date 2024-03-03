import React from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import BannerReview from './BannerReview';
import { BANNER_REVIEWS } from '../../../public/banner-infos';
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
