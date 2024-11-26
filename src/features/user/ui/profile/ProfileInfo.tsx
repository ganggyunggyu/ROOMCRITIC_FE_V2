import { Loading } from '../../../../shared/ui/loading';
import { useGetUserInfo } from '@/entities/user/hooks';

const ProfileInfo = () => {
  const { userInfo, isUserInfoLoading } = useGetUserInfo();
  if (isUserInfoLoading) return <Loading />;
  const { userInfo: info } = userInfo;
  return (
    <div className="flex gap-3 flex-col">
      <p className="text-xl">{info.displayName}</p>
      <div className="flex gap-1">
        <p>팔로워</p>
        <span>10</span>
        <p>팔로잉</p>
        <span>10</span>
      </div>
    </div>
  );
};
export default ProfileInfo;
