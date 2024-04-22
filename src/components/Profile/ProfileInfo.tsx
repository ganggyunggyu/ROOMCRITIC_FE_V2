import Button from '../atom-component/Button';

const ProfileInfo = ({ name }) => {
  return (
    <div className='flex gap-3 flex-col'>
      <p className='text-xl'>{name}</p>
      <div className='flex gap-1'>
        <p>팔로워</p>
        <span>10</span>
        <p>팔로잉</p>
        <span>10</span>
      </div>
      <Button label={'팔로우'} bg={'main'} />
    </div>
  );
};
export default ProfileInfo;
