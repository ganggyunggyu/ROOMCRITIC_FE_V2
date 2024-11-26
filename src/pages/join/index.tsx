import { ResponsiveProvider } from '../../widgets/ui';
import { JoinForm } from '@/features';

export default function Join() {
  return (
    <ResponsiveProvider direction={'col'}>
      <JoinForm />
    </ResponsiveProvider>
  );
}
