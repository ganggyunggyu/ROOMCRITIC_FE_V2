import { fetchLoginStatus } from '../../api/API';
import { useQuery } from '@tanstack/react-query';

const useLoginStatus = () => {
  return useQuery({ queryKey: ['userId'], queryFn: fetchLoginStatus });
};

export default useLoginStatus;
