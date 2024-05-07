import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import useCheckLoginStatus from '../shared/hooks/auth/useCheckLoginStatus';
import { scrollToTop } from '../shared/lib/scrollToTop';
import { useAppDispatch } from '../app/store';
import { setPrevPathName } from '../app/store/slice/prevPathName';

const HomePage = React.lazy(() => import('./home'));
const ProfilePage = React.lazy(() => import('./profile'));
const JoinPage = React.lazy(() => import('./join'));
const LoginPage = React.lazy(() => import('./login'));
const SearchPage = React.lazy(() => import('./search'));
const ContentDetailPage = React.lazy(() => import('./content-detail'));
const ReviewDetailPage = React.lazy(() => import('./review-detail'));
const UpdatePage = React.lazy(() => import('./update'));

const Routing: React.FC = () => {
  useCheckLoginStatus();
  const location = useLocation();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const scrollTop = scrollToTop();
    const isLoginPage = location.pathname === '/login';
    if (!isLoginPage) dispatch(setPrevPathName(location.pathname));
    return () => scrollTop;
  }, [location, dispatch]);

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
