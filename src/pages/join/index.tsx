import ResponsiveProvider from '../ui/ResponsiveProvider';
import FormHeader from '../../shared/ui/FormHeader';
import JoinForm from '../../entities/join/JoinForm';

export default function Join() {
  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'회원가입'} />
      <JoinForm />
    </ResponsiveProvider>
  );
}
