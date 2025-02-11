import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';
import ProfileScore from './ProfileScore';

export const ProfileContainer = () => {
  return (
    <article className="flex flex-col justify-start w-full gap-5">
      <ProfileImage />
      <ProfileInfo />
      <ProfileScore />
    </article>
  );
};
