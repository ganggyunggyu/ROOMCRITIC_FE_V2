import React from 'react';
import Banner from '../components/Banner/Banner';

import CategoryReviewList from '../components/CategoryReviewList';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <React.Fragment>
      <Banner />
      <CategoryReviewList />
      <Footer />
    </React.Fragment>
  );
}
