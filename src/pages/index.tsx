import React from 'react';
import useCheckLoginStatus from '../shared/hooks/auth/useCheckLoginStatus';
import { Navigate, Route, Routes } from 'react-router-dom';

const HomePage = React.lazy(() => import('./Home'));
const ProfilePage = React.lazy(() => import('./Profile'));
const JoinPage = React.lazy(() => import('./Join'));
const LoginPage = React.lazy(() => import('./Login'));
const SearchPage = React.lazy(() => import('./Search'));
const ContentDetailPage = React.lazy(() => import('./ContentDetail'));
const ReviewDetailPage = React.lazy(() => import('./ReviewDetail'));
const UpdatePage = React.lazy(() => import('./Update'));

const Routing: React.FC = () => {
  useCheckLoginStatus();
  return (
    <section className='mt-12 flex flex-col items-center justify-center'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile/:userIdParam' element={<ProfilePage />} />
        <Route path='/join' element={<JoinPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/content/:contentTypeParam/:contentIdParam' element={<ContentDetailPage />} />
        <Route path='/detail/review/:userIdParam/:reviewIdParam' element={<ReviewDetailPage />} />
        <Route path='/update/:userIdParam/:reviewIdParam' element={<UpdatePage />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </section>
  );
};

export default Routing;
