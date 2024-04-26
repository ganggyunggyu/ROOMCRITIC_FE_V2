import ResponsiveProvider from '../components/wrap-provider/ResponsiveProvider';
import FormHeader from '../components/atom-component/FormHeader';
import LoginForm from '../components/login/LoginForm';
export default function Login() {
  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'로그인'} />
      <LoginForm />
    </ResponsiveProvider>
  );
}
