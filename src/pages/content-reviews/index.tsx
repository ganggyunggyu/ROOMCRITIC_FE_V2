import React from 'react';
import { ResponsiveProvider } from '../ui';
import { Review } from '../../features';

const index: React.FC = () => {
  return (
    <ResponsiveProvider direction='col' className='pt-20'>
      <Review.U.ContentReviews />
    </ResponsiveProvider>
  );
};

export default index;
