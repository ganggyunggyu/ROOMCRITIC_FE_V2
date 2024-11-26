import { ResponsiveProvider } from '@/widgets/responsive-provider';
import { LoginForm } from '@/features';

export default function Login() {
  return (
    <ResponsiveProvider direction={'col'}>
      <LoginForm />
    </ResponsiveProvider>
  );
}
