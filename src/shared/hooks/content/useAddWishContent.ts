import { useMutation } from '@tanstack/react-query';
import { addWishContent } from '../../api/api';

const useAddWishContent = () => {
  return useMutation({
    mutationFn: addWishContent,
    // onSuccess(data, variables, context) {
    //   console.log('Success', data);
    //   console.log('Success', variables);
    //   console.log('Success', context);
    // },
    // onError(error, variables, context) {
    //   console.log('Error', error);
    //   console.log('Error', variables);
    //   console.log('Error', context);
    // },
    // onSettled(data, error, variables, context) {
    //   console.log('Settled', data);
    //   console.log('Settled', error);
    //   console.log('Settled', variables);
    //   console.log('Settled', context);
    // },
  });
};

export default useAddWishContent;
