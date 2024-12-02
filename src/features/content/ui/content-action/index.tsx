import { useAppSelector } from '@/app/store';
import { CreateForm } from '@/features/review';
import { LoginButton, Loading } from '@/shared';

export function Action({ isLoading, content }) {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={'flex flex-col w-full gap-10 z-10'}>
      {isLoggedIn ? <CreateForm content={content} /> : <LoginButton />}
    </section>
  );
}
