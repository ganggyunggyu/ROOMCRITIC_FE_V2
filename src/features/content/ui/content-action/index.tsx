import { useAppSelector } from '../../../../app/store';
import { LoginButton, Loading } from '@/shared';
import CreateForm from '../../../review/ui/review-create-form';

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
