import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/ui/button/button';
const ErrorProvider = () => {
  const navigate = useNavigate();
  const redirectHome = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5 z-20'>
      <h1 className='text-3xl font-bold text-red-600'>오류가 발생했습니다.</h1>
      <p className='text-lg text-gray-200'>페이지를 새로고침해주세요.</p>
      <Button variant='alert' label='홈으로 이동하기' onClick={redirectHome} />
    </div>
  );
};
export default ErrorProvider;
