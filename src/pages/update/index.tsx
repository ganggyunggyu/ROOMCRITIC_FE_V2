import { ResponsiveProvider } from '../../widgets/ui';
import { UpdateForm } from '../../features/review/ui';

export default function Update() {
  return (
    <ResponsiveProvider direction="col" className="gap-5 pt-10">
      <UpdateForm />
    </ResponsiveProvider>
  );
}
