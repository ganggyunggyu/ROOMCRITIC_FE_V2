import ProfileImage from '../../../entities/profile/ProfileImage';
import ProfileInfo from '../../../entities/profile/ProfileInfo';
import ProfileScore from '../../../entities/profile/ProfileScore';

export default function ProfileContainer() {
  return (
    <article className='flex flex-col justify-start w-full gap-5'>
      <ProfileImage />
      <ProfileInfo />
      <ProfileScore />
    </article>
  );
}
