import ResponsiveProvider from '../entities/wrap-provider/ResponsiveProvider';
import FormHeader from '../entities/atom-component/FormHeader';
import LoginForm from '../entities/login/LoginForm';
export default function Login() {
  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'로그인'} />
      <LoginForm />
    </ResponsiveProvider>
  );
}
