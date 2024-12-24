import { useAppSelector } from '@/app/store';
import { Content } from '@/entities';
import { CreateForm } from '@/features/review';
import { LoginButton, Loading } from '@/shared';
import React from 'react';

interface ActionProps {
  isLoading: boolean;
  content: Content;
}

export const Action: React.FC<ActionProps> = ({ isLoading, content }) => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={'flex flex-col w-full gap-10 z-10'}>
      {isLoggedIn ? <CreateForm content={content} /> : <LoginButton />}
    </section>
  );
};
