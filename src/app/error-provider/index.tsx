import { Link } from 'react-router-dom';

const ErrorProvider = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold text-red-600'>오류가 발생했습니다.</h1>
      <p className='text-lg text-gray-700'>페이지를 새로고침해주세요.</p>
      <Link to={'/'}>홈으로 이동하기</Link>
    </div>
  );
};
export default ErrorProvider;
