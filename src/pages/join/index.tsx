import ResponsiveProvider from '../ui/ResponsiveProvider';
import FormHeader from '../../shared/ui/FormHeader';
import { User } from '../../features';

export default function Join() {
  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'회원가입'} />
      <User.UI.JoinForm />
    </ResponsiveProvider>
  );
}
