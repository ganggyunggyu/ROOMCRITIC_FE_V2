import { useParams } from 'react-router-dom';
import { MineError } from '../error/MineError';

const ProfileSetting = () => {
  const { userIdParam } = useParams();

  return (
    <MineError userIdParam={userIdParam}>
      <div>{userIdParam}</div>
    </MineError>
  );
};
export default ProfileSetting;
