import { ResponsiveProvider, Banner, Footer } from '@/widgets';
import { Category } from '@/features';
export default function Home() {
  return (
    <ResponsiveProvider direction="col">
      <Banner />
      <Category />
      <Footer />
    </ResponsiveProvider>
  );
}
