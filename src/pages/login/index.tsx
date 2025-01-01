import { ResponsiveProvider } from '@/widgets';
import { LoginForm } from '@/features';

export default function Login() {
  return (
    <ResponsiveProvider direction={'col'}>
      <LoginForm />
    </ResponsiveProvider>
  );
}
