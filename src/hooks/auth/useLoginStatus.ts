import { fetchLoginStatus } from '../../api/API';
import { useQuery } from '@tanstack/react-query';
const useLoginStatus = () => {
  return useQuery({
    queryFn: fetchLoginStatus,
    queryKey: ['userId'],
    gcTime: 0,
  });
};

export default useLoginStatus;
