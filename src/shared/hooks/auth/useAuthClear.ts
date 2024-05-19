import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setClearAccessToken } from '../../../app/store/slice/tokenSlice';
import { setClearAuth } from '../../../app/store/slice/userSlice';
import { clearCookie } from '../../lib/cookie';

const useAuthClear = () => {
  const accessToken = useAppSelector((state) => state.accessToken);
  const dispatch = useAppDispatch();

  if (!accessToken) {
    dispatch(() => setClearAccessToken());
    dispatch(() => setClearAuth());
    clearCookie('refreshToken');
    clearCookie('accessToken');
  }
};

export default useAuthClear;
