import React from 'react';
import { Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';

import { scrollToTop } from '../shared/lib/scrollToTop';
import { useAppDispatch } from '../app/store';
import { setPrevPathName } from '../app/store/slice/prevPathName';
import { setNavigationType } from '../app/store/slice/navigationTypeSlice';
import { AnimatePresence } from 'framer-motion';

const HomePage = React.lazy(() => import('./home'));
const ProfilePage = React.lazy(() => import('./profile'));
const JoinPage = React.lazy(() => import('./join'));
const LoginPage = React.lazy(() => import('./login'));
const SearchPage = React.lazy(() => import('./search'));
const SearchesPage = React.lazy(() => import('./searches'));
const ContentDetailPage = React.lazy(() => import('./content-detail'));
const ReviewDetailPage = React.lazy(() => import('./review-detail'));
const UpdatePage = React.lazy(() => import('./update'));
const ProfileSettiongPage = React.lazy(() => import('./profile-setting'));
const ContentReviews = React.lazy(() => import('./content-reviews'));

const Routing: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigationType = useNavigationType();
  React.useLayoutEffect(() => {
    dispatch(setNavigationType(navigationType));
  }, [dispatch, navigationType]);

  React.useEffect(() => {
    const scrollTop = scrollToTop();
    const isLoginPage = location.pathname === '/login';
    if (!isLoginPage) dispatch(setPrevPathName(location.pathname));
    return () => scrollTop;
  }, [location, dispatch, navigationType]);

  return (
    <AnimatePresence key={location.key}>
      <Routes location={location}>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile/:userIdParam' element={<ProfilePage />} />
        <Route path='/profile-setting/:userIdParam' element={<ProfileSettiongPage />} />
        <Route path='/join' element={<JoinPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/searches' element={<SearchesPage />} />
        <Route path='/content/:contentIdParam' element={<ContentDetailPage />} />
        <Route path='/content/reviews/:contentIdParam' element={<ContentReviews />} />
        <Route path='/detail/review/:userIdParam/:reviewIdParam' element={<ReviewDetailPage />} />
        <Route path='/update/:userIdParam/:reviewIdParam' element={<UpdatePage />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Routing;
