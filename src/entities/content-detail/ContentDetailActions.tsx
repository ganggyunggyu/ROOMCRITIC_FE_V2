import React from 'react';
import { useAppSelector } from '../../app/store';
import Loading from '../../shared/ui/Loading';
import LoginButton from '../../shared/ui/LoginButton';
import CreateForm from './CreateForm';

export default function ContentDetailActions({ isLoading, content }) {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={'flex flex-col w-full gap-5 z-10'}>
      {isLoggedIn ? (
        <React.Fragment>
          <CreateForm content={content} />
        </React.Fragment>
      ) : (
        <LoginButton />
      )}
    </section>
  );
}
