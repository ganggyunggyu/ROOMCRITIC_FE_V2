import { useMutation } from '@tanstack/react-query';
import { submitJoin } from '../../api/API';

const useJoin = () => {
  return useMutation({
    mutationKey: ['join'],
    mutationFn: submitJoin,
  });
};
export default useJoin;
