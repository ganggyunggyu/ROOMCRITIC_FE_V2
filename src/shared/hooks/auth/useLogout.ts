import { useMutation } from '@tanstack/react-query';
import { submitLogout } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store';
import { setClearAuth } from '../../../app/store/slice/userSlice';
import { clearCookie } from '../../lib/cookie';

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: submitLogout,
    onSuccess: () => {
      navigate('/');
      dispatch(() => setClearAuth());
      clearCookie('refreshToken');

      window.location.reload();
    },
  });
};

export default useLogout;
