import React from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { setIsRightSideBar } from '@/app/store/slice/ui/sidebar';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { useLogout } from '@/entities';
import { useDevice, Logo, cn, getCookie, HamburgerIcon } from '@/shared';
import { GrPrevious } from 'react-icons/gr';

const Header = () => {
  const navigate = useNavigate();
  const { userInfo, isLoggedIn } = useAppSelector((state) => state.user);
  const { darkModeClasses } = useAppSelector((state) => state.darkMode);
  const dispatch = useAppDispatch();
  const { mutate } = useLogout();

  const deviceType = useDevice();

  const logoutHandler = () => {
    mutate(getCookie('refreshToken'));
  };
  const [isHeaderBackground, setIsHeaderBackground] =
    React.useState<boolean>(true);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setIsHeaderBackground(false);
      } else {
        setIsHeaderBackground(true);
      }
    });
  }, [window.scrollY]);

  const handleHamburgerClick = () => {
    dispatch(setIsRightSideBar(true));
  };

  const handlePrevClick = () => {
    navigate(-1);
  };
  return (
    <React.Fragment>
      {deviceType === 'mobile' ? (
        <header
          className={cn(
            `fixed w-screen top-0 left-0  p-3 flex items-center justify-between z-30 transition-colors duration-300 ease-in-out ${darkModeClasses} ${
              isHeaderBackground && 'bg-opacity-0 text-white'
            }`,
          )}
        >
          <GrPrevious onClick={handlePrevClick} className="w-8" />

          <Logo />
          <HamburgerIcon onClick={handleHamburgerClick} className=" w-8" />
        </header>
      ) : (
        <header
          className={cn(
            `h-12 fixed top-0 left-0 right-0 p-3 flex items-center justify-center z-30 transition-all ${darkModeClasses} ${
              isHeaderBackground && 'bg-opacity-0'
            }`,
          )}
        >
          <nav className="flex justify-around gap-3 w-10/12 transition-all">
            <Link to={'/'}>
              <h1 className="hover:text-violet-400 transition-all w-min-fit">
                ROOM CRITIC
              </h1>
            </Link>
            <div className="grow"></div>
            <div>
              {isLoggedIn ? (
                <div className="flex gap-3 items-center justify-center w-min-fit">
                  <Link
                    className="hover:text-violet-400 transition-all w-min-fit"
                    to={`/profile/${userInfo._id}`}
                  >
                    {userInfo.displayName} 평론가
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="hover:text-violet-400 transition-all w-min-fit"
                  >
                    로그아웃
                  </button>
                  <Link
                    className="hover:text-violet-400 transition-all w-min-fit"
                    to={'/search'}
                  >
                    검색
                  </Link>
                </div>
              ) : (
                <div className="flex gap-5 w-min-fit">
                  <Link
                    className="hover:text-violet-400 transition-all"
                    to={'/login'}
                  >
                    로그인
                  </Link>

                  <Link
                    className="hover:text-violet-400 transition-all"
                    to={'/join'}
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </header>
      )}
    </React.Fragment>
  );
};

export { Header };
