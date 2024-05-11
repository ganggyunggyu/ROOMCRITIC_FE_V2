import { useMutation } from '@tanstack/react-query';
import { submitLogout } from '../../api/API';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store';
import { setClearAuth } from '../../../app/store/slice/userSlice';

//로그아웃
//홈으로
//

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: submitLogout,
    onSuccess: () => {
      navigate('/');
      dispatch(() => setClearAuth());
    },
  });
};

export default useLogout;
