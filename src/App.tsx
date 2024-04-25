import './app/styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Join from './pages/Join';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Home from './pages/Home';
import ContentDetail from './pages/ContentDetail';
import ReviewDetail from './pages/ReviewDetail';
import Update from './pages/Update';
import Header from './components/Header';
import DarkModeButton from './components/atom-component/DarkModeButton';
import useCheckLoginStatus from './shared/hooks/auth/useCheckLoginStatus';
import useDarkMode from './shared/hooks/common/useDarkMode';
import { cn } from './shared/util/cn';
import Footer from './components/Footer';
import { useAppDispatch, useAppSelector } from './app/store';
import Button from './components/atom-component/Button';
import { decrement, increment, incrementByAmount } from './app/store/counterSlice';

function App() {
  useCheckLoginStatus();
  const { isDarkMode, darkModeClasses, toggleDarkMode } = useDarkMode();
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

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
      <Footer />
      <DarkModeButton darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className='flex gap-5 p-10'>
        <Button bg='main' label='증가' onClick={() => dispatch(increment())} />
        <Button bg='main' label='하락' onClick={() => dispatch(decrement())} />
        <Button bg='main' label='10증가' onClick={() => dispatch(incrementByAmount(10))} />
        <p>{count}</p>
      </div>
    </main>
  );
}

export default App;
