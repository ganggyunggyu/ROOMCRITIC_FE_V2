import React from 'react';
import Banner from '../components/Banner/Banner';

import CategoryContents from '../components/CategoryContents';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <React.Fragment>
      <Banner />
      <CategoryContents />
      <Footer />
    </React.Fragment>
  );
}
