import './styles/App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Join from './pages/Join';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Serch from './pages/Serch';
import Home from './pages/Home';
import ContentDetail from './pages/ContentDetail';
import Create from './pages/Create';
import ReviewDetail from './pages/ReviewDetail';
import DarkModeButton from './components/AtomComponent/DarkModeButton';

import useDarkMode from './hooks/useDarkMode';
import Update from './pages/Update';
import { cn } from './util/cn';
import axiosConfig from './api/axiosConfig';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState, userInfoState } from './store/atoms';

function App() {
  const { isDarkMode, darkModeClasses, toggleDarkMode } = useDarkMode();
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const fetchLogin = async () => {
    try {
      const result = await axiosConfig.get('/auth/login/check');

      if (result.status === 200) {
        setIsLoggedIn(true);
        setUserInfo(result.data.userInfo.user);
      }
      if (result.status === 201) {
        setIsLoggedIn(false);
        setUserInfo({ _id: '', displayName: '' });
      }
    } catch (error) {
      console.error('fetchLoginERROR !!', error);
    }
  };

  React.useEffect(() => {
    fetchLogin();
  }, []);
  return (
    <main className={cn(`${darkModeClasses} transition-all`)}>
      <Header />
      <section className='mt-12 flex flex-col items-center justify-center'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/join' element={<Join />} />
          <Route path='/login' element={<Login />} />
          <Route path='/serch' element={<Serch />} />
          <Route path='/content/:contentType/:contentId' element={<ContentDetail />} />
          <Route path='/detail/review/:userId/:reviewId' element={<ReviewDetail />} />
          <Route path='/create/:contentType/:contentId' element={<Create />} />
          <Route path='/update/:userId/:reviewId' element={<Update />} />
        </Routes>
      </section>
      <DarkModeButton darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </main>
  );
}

export default App;
