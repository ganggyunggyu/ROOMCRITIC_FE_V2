import React from 'react';
import { ContentReviews } from '../../features/content/ui/ContentReviews';
import ResponsiveProvider from '../ui/ResponsiveProvider';

const index: React.FC = () => {
  return (
    <ResponsiveProvider direction='col'>
      <ContentReviews />
    </ResponsiveProvider>
  );
};

export default index;
