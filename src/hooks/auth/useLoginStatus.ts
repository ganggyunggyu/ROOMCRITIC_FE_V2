import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../store/atoms';

import { fetchLoginStatus } from '../../api/API';
const useLoginStatus = () => {
  const userInfo = useRecoilValue(userInfoState);

  return useQuery({
    queryFn: fetchLoginStatus,
    queryKey: ['userId', userInfo._id],
    gcTime: 0,
  });
};

export default useLoginStatus;
