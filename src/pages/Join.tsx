import ResponsiveProvider from '../entities/wrap-provider/ResponsiveProvider';
import FormHeader from '../entities/atom-component/FormHeader';
import JoinForm from '../entities/join/JoinForm';

export default function Join() {
  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'회원가입'} />
      <JoinForm />
    </ResponsiveProvider>
  );
}
