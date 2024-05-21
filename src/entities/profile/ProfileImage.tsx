import { LazyLoadImage } from 'react-lazy-load-image-component';
import SettingIcon from '../../shared/icons/SettingIcon';
import { Button } from '../../shared/ui';

const ProfileImage = () => {
  return (
    <div className='flex justify-between'>
      <LazyLoadImage
        style={{ width: '150px', height: '150px' }}
        className='rounded-full'
        width={'150px'}
        height={'150px'}
        src='https://i.pinimg.com/564x/5c/a2/e6/5ca2e650b72d9f34f71c835762ee6722.jpg'
        alt='profile-img'
      />
      <Button item={<SettingIcon />} className={'h-12 w-12 hover:text-violet-400'} />
    </div>
  );
};

export default ProfileImage;
