import ResponsiveProvider from '../components/WrapProvider/ResponsiveProvider';
import FormHeader from '../components/FormHeader';
import JoinForm from '../components/Join/JoinForm';

export default function Join() {
  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'회원가입'} />
      <JoinForm />
    </ResponsiveProvider>
  );
}
