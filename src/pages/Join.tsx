import ResponsiveProvider from '../components/wrap-provider/ResponsiveProvider';
import FormHeader from '../components/FormHeader';
import JoinForm from '../components/join/JoinForm';

export default function Join() {
  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'회원가입'} />
      <JoinForm />
    </ResponsiveProvider>
  );
}
