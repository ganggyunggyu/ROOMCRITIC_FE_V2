import React from 'react';
import { ResponsiveProvider } from '@/widgets';
import { ContentReviews } from '@/features';

const index: React.FC = () => {
  return (
    <ResponsiveProvider direction="col" className="pt-20">
      <ContentReviews />
    </ResponsiveProvider>
  );
};

export default index;
