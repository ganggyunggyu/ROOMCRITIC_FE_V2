import { Link, useNavigate } from 'react-router-dom';
import AxiosConfig from '../../shared/api/AxiosConfig';
import { useAppSelector } from '../store';

const Header = () => {
  const navigator = useNavigate();
  const { userInfo, isLoggedIn } = useAppSelector((state) => state.user);
  const { darkModeClasses } = useAppSelector((state) => state.darkMode);

  const submitLogout = async () => {
    try {
      const result = await AxiosConfig.get('auth/logout');
      if (result.status === 200) {
        navigator('/');
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header
      className={`h-12 fixed top-0 left-0 right-0 p-3 flex items-center justify-center shadow-lg z-20 ${darkModeClasses}`}
    >
      <nav className='flex justify-around gap-3 w-10/12 transition-all'>
        <Link to={'/'}>
          <h1 className='hover:text-violet-400 transition-all w-min-fit'>ROOM CRITIC</h1>
        </Link>
        <div className='grow'></div>
        <div>
          {isLoggedIn ? (
            <div className='flex gap-3 items-center justify-center w-min-fit'>
              <Link
                className='hover:text-violet-400 transition-all w-min-fit'
                to={`/profile/${userInfo._id}`}
              >
                {userInfo.displayName} 평론가
              </Link>
              <button
                onClick={submitLogout}
                className='hover:text-violet-400 transition-all w-min-fit'
              >
                로그아웃
              </button>
              <Link className='hover:text-violet-400 transition-all w-min-fit' to={'/search'}>
                검색
              </Link>
            </div>
          ) : (
            <div className='flex gap-5 w-min-fit'>
              <Link className='hover:text-violet-400 transition-all w-min-fit' to={'/login'}>
                로그인
              </Link>

              <Link className='hover:text-violet-400 transition-all w-min-fit' to={'/join'}>
                회원가입
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
