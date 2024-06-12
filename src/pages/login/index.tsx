import { ResponsiveProvider } from '../ui';
import FormHeader from '../../shared/ui/FormHeader';
import { User } from '../../features';

export default function Login() {
  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'로그인'} />
      <User.U.LoginForm />
    </ResponsiveProvider>
  );
}
