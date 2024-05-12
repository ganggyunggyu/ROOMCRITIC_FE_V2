import React from 'react';
import Banner from '../../entities/banner/Banner';
import CategoryContents from '../../features/content/ui/CategoryContents';
import ResponsiveProvider from '../ui/ResponsiveProvider';

export default function Home() {
  return (
    <React.Fragment>
      <Banner />
      <ResponsiveProvider direction='col'>
        <CategoryContents />
      </ResponsiveProvider>
    </React.Fragment>
  );
}