import React from 'react';
import Banner from '../components/banner/Banner';
import CategoryContents from '../components/CategoryContents';

export default function Home() {
  return (
    <React.Fragment>
      <Banner />
      <CategoryContents />
    </React.Fragment>
  );
}
