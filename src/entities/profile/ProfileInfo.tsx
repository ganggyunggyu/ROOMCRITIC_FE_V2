import useAuthenticatedUserInfo from '../../shared/hooks/auth/useAuthenticatedUserInfo';
import useIsMyPostOwner from '../../shared/hooks/auth/useIsMyPostOwner';
import Button from '../atom-component/Button';

const ProfileInfo = () => {
  const isMyProfile = useIsMyPostOwner();
  const { displayName } = useAuthenticatedUserInfo();

  return (
    <div className='flex gap-3 flex-col'>
      <p className='text-xl'>{displayName}</p>
      <div className='flex gap-1'>
        <p>팔로워</p>
        <span>10</span>
        <p>팔로잉</p>
        <span>10</span>
      </div>
      {isMyProfile && '내 프로필'}
      {!isMyProfile && <Button label={'팔로우'} bg={'main'} />}
    </div>
  );
};
export default ProfileInfo;
