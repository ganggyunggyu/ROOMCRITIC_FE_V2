import { useNavigate } from 'react-router-dom';
import { Button } from '../button';

export function LoginButton() {
  const navigator = useNavigate();
  return (
    <Button
      label={'로그인하고 리뷰 써요!'}
      variant="main"
      className="w-full text-lg"
      onClick={() => navigator(`/login`)}
    />
  );
}
