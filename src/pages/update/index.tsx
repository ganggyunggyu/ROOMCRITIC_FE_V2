import { UpdateForm } from '@/features';
import { ResponsiveProvider } from '@/widgets';

export default function Update() {
  return (
    <ResponsiveProvider direction="col" className="gap-5 pt-10">
      <UpdateForm />
    </ResponsiveProvider>
  );
}
