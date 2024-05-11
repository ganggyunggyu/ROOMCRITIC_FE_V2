import { useAppSelector } from '../../app/store';

export const useAccessToken = () => {
  const accessToken = useAppSelector((state) => state.accessToken);
  console.log(accessToken);
  return accessToken;
};
