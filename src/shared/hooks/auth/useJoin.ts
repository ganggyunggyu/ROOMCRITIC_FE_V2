import { useMutation } from '@tanstack/react-query';
import { submitJoin } from '../../api/api';

const useJoin = () => {
  return useMutation({
    mutationKey: ['join'],
    mutationFn: submitJoin,
  });
};
export default useJoin;
