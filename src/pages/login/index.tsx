import ResponsiveProvider from '../ui/ResponsiveProvider';
import FormHeader from '../../shared/ui/FormHeader';
import LoginForm from '../../entities/login/LoginForm';
export default function Login() {
  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'로그인'} />
      <LoginForm />
    </ResponsiveProvider>
  );
}
