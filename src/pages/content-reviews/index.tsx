import React from 'react';
import { ResponsiveProvider } from '../../widgets/ui';
import { Review } from '../../features';

const index: React.FC = () => {
  return (
    <ResponsiveProvider direction="col" className="pt-20">
      <Review.U.ContentReviews />
    </ResponsiveProvider>
  );
};

export default index;
