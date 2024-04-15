import ResponsiveProvider from '../components/WrapProvider/ResponsiveProvider';
import FormHeader from '../components/FormHeader';
import LoginForm from '../components/Login/LoginForm';
export default function Login() {
  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'로그인'} />
      <LoginForm />
    </ResponsiveProvider>
  );
}
