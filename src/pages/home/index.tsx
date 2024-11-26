import { ResponsiveProvider, Banner } from '../../widgets/ui/index';
import { Category } from '../../features/content/ui';
import Footer from '@/widgets/footer';
export default function Home() {
  return (
    <ResponsiveProvider direction="col">
      <Banner />
      <Category />
      <Footer />
    </ResponsiveProvider>
  );
}
