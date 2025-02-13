import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/store';
import { setIsRightSideBar } from '@/app/store/slice/ui/sidebar';

import { useLogout } from '@/entities';

import { delay } from '@/shared/lib/delay';
import { getCookie } from '@/shared/lib/cookie';

export const RightSideBar = () => {
  const dispatch = useAppDispatch();
  const { userInfo, isLoggedIn } = useAppSelector((state) => state.user);
  const { mutate: logoutMutate } = useLogout();

  const [isOpen, setIsOpen] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  const closeSidebar = () => {
    dispatch(setIsRightSideBar(false));
  };

  React.useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleBackgroundClick = async () => {
    setIsExiting(true);
    await delay(300);
    setIsOpen(false);
    closeSidebar();
  };
  const handleLogoutClick = () => {
    logoutMutate(getCookie('refreshToken'));
  };

  return (
    <div className={`fixed top-0 w-screen h-screen z-40`}>
      <section
        className={`fixed right-0 flex flex-col items-center gap-5 p-5 bg-zinc-800 text-white w-5/12 h-screen z-50 
        ${isOpen && !isExiting ? 'translate-x-0' : 'translate-x-full'} 
        transition-transform duration-300`}
      >
        {!isLoggedIn && (
          <React.Fragment>
            <Link onClick={closeSidebar} to={'/login'}>
              로그인
            </Link>
            <Link onClick={closeSidebar} to={'/join'}>
              회원가입
            </Link>
          </React.Fragment>
        )}
        {isLoggedIn && (
          <React.Fragment>
            <Link
              onClick={closeSidebar}
              to={`/profile/${userInfo._id}`}
              className="min-w-max"
            >
              {userInfo.displayName}님 환영합니다!
            </Link>

            <Link onClick={closeSidebar} to={'/search'}>
              검색
            </Link>
            <p onClick={handleLogoutClick}>로그아웃</p>
          </React.Fragment>
        )}
      </section>
      <div
        onClick={handleBackgroundClick}
        className={`${isOpen && !isExiting ? 'bg-opacity-50' : 'bg-opacity-0'} transition-bg duration-300 w-full h-full  bg-black`}
      />
    </div>
  );
};
