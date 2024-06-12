import { useMutation } from '@tanstack/react-query';
import * as A from './api';

export const useAddWatchContent = () => {
  return useMutation({
    mutationFn: A.addWatchContent,
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

export const useAddWishContent = () => {
  return useMutation({
    mutationFn: A.addWishContent,
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
