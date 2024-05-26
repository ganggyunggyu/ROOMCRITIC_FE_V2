import DetailBackground from '../../pages/ui/DetailBackground';
import { useAppSelector } from '../store';

const Fullback = () => {
  const { backgroundPath } = useAppSelector((state) => state.backgroundPath);
  return (
    <div className='flex items-center justify-center h-screen'>
      <DetailBackground path={backgroundPath}></DetailBackground>
    </div>
  );
};
export default Fullback;
