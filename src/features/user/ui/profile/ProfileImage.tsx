import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, useParams } from 'react-router-dom';
import SettingIcon from '../../../../shared/ui/icons/SettingIcon';
import { Button } from '../../../../shared/ui';
import { useAppSelector } from '../../../../app/store';

const ProfileImage = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const { userInfo } = useAppSelector((state) => state.user);
  const { userIdParam } = useParams();
  const navigate = useNavigate();
  const redirectSettiong = () => {
    if (userInfo) navigate(`/profile-setting/${userInfo._id}`);
    if (!userInfo) navigate('auth/error');
  };
  return (
    <div className="flex justify-between">
      <LazyLoadImage
        style={{ width: '150px', height: '150px' }}
        className="rounded-full"
        width={'150px'}
        height={'150px'}
        src="https://i.pinimg.com/564x/5c/a2/e6/5ca2e650b72d9f34f71c835762ee6722.jpg"
        alt="profile-img"
      />
      {isLoggedIn && userInfo._id === userIdParam && (
        <Button onClick={redirectSettiong} item={<SettingIcon />} className={'h-12 w-12'} variant="bgNone" />
      )}
    </div>
  );
};

export default ProfileImage;
