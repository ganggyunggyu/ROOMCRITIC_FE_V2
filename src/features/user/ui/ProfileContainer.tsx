import ProfileImage from '../../../entities/user/ui/ProfileImage';
import ProfileInfo from '../../../entities/user/ui/ProfileInfo';
import ProfileScore from '../../../entities/user/ui/ProfileScore';

export const ProfileContainer = () => {
  return (
    <article className='flex flex-col justify-start w-full gap-5'>
      <ProfileImage />
      <ProfileInfo />
      <ProfileScore />
    </article>
  );
};
