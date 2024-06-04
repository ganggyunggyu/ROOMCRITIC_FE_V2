import React from 'react';
import { ContentReviews } from '../../features/content/ui/ContentReviews';
import ResponsiveProvider from '../ui/ResponsiveProvider';

const index: React.FC = () => {
  return (
    <ResponsiveProvider direction='col' className='pt-20'>
      <ContentReviews />
    </ResponsiveProvider>
  );
};

export default index;
