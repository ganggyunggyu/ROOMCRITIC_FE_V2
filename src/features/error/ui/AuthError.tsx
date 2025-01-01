import React from 'react';
import { useAppSelector } from '@/app/store';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui';

export const AuthError = ({ children }) => {
  const navigate = useNavigate();
  const redirectLogin = () => {
    navigate('/login');
  };
  const redirectJoin = () => {
    navigate('/join');
  };
  const { isLoggedIn } = useAppSelector((state) => state.user);
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col justify-center items-center gap-10 p-10">
        <h1 className="text-5xl font-bold text-red-600">401 Error</h1>
        <h1 className="text-3xl font-bold text-red-600">
          로그인이 필요한 작업입니다.
        </h1>
        <p className="text-lg text-gray-200">
          아래의 버튼을 눌러 로그인을 먼저 해주십시오.
        </p>
        <div className="flex gap-5">
          <Button variant="main" label="로그인" onClick={redirectLogin} />
          <Button variant="main" label="회원가입" onClick={redirectJoin} />
        </div>
      </div>
    );
  }
  return <React.Fragment>{children}</React.Fragment>;
};
