import { ResponsiveProvider } from '@/widgets';
import { JoinForm } from '@/features';

export default function Join() {
  return (
    <ResponsiveProvider direction={'col'}>
      <JoinForm />
    </ResponsiveProvider>
  );
}
