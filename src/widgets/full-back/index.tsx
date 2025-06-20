import { useAppSelector } from '@/app/store';
import { DetailBackground } from '../../widgets';

export const Fullback = () => {
  const { backgroundPath } = useAppSelector((state) => state.backgroundPath);
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <DetailBackground path={backgroundPath}></DetailBackground>
    </div>
  );
};
