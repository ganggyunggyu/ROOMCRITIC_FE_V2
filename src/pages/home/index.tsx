import React from 'react';
import Banner from '../../entities/banner/Banner';
import CategoryContents from '../../entities/CategoryContents';

export default function Home() {
  return (
    <React.Fragment>
      <Banner />
      <CategoryContents />
    </React.Fragment>
  );
}
