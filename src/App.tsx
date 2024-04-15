import './styles/App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Join from './pages/Join';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Home from './pages/Home';
import ContentDetail from './pages/ContentDetail';
import ReviewDetail from './pages/ReviewDetail';
import DarkModeButton from './components/AtomComponent/DarkModeButton';
import useDarkMode from './hooks/useDarkMode';
import Update from './pages/Update';
import { cn } from './util/cn';
import useCheckLoginStatus from './hooks/auth/useCheckLoginStatus';

function App() {
  const { isDarkMode, darkModeClasses, toggleDarkMode } = useDarkMode();
  useCheckLoginStatus();

  return (
    <main className={cn(`${darkModeClasses} transition-all`)}>
      <Header />
      <section className='mt-12 flex flex-col items-center justify-center'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/join' element={<Join />} />
          <Route path='/login' element={<Login />} />
          <Route path='/search' element={<Search />} />
          <Route path='/content/:contentType/:contentId' element={<ContentDetail />} />
          <Route path='/detail/review/:userId/:reviewId' element={<ReviewDetail />} />
          <Route path='/update/:userId/:reviewId' element={<Update />} />
        </Routes>
      </section>
      <DarkModeButton darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </main>
  );
}

export default App;
