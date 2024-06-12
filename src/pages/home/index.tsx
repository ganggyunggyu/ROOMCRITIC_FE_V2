import { ResponsiveProvider, Banner } from '../ui/index';
import { Category } from '../../features/content/ui';

export default function Home() {
  return (
    <ResponsiveProvider direction='col'>
      <Banner />
      <Category />
    </ResponsiveProvider>
  );
}
