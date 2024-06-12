import { ResponsiveProvider } from '../ui';
import FormHeader from '../../shared/ui/FormHeader';
import { User } from '../../features';

export default function Join() {
  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'회원가입'} />
      <User.U.JoinForm />
    </ResponsiveProvider>
  );
}
