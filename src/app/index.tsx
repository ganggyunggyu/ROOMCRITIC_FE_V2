import './styles/App.css';
import { Suspense } from 'react';
import Footer from './footer';
import Header from './header';
import DarkModeButton from './dark-mode-button';
import Routing from '../pages';
import ErrorProvider from './error-provider';
import Fullback from './full-back';
import { cn } from '../shared/lib/cn';
import { useAppSelector } from './store';
import { ErrorBoundary } from 'react-error-boundary';
import DetailBackground from '../pages/ui/DetailBackground';
function App() {
  const { darkModeClasses } = useAppSelector((state) => state.darkMode);
  const { backgroundPath } = useAppSelector((state) => state.backgroundPath);
  return (
    <main className={cn(`${darkModeClasses} transition-all`)}>
      <Header />
      <DetailBackground path={backgroundPath} />
      <ErrorBoundary fallback={<ErrorProvider />}>
        <Suspense fallback={<Fullback />}>
          <Routing />
        </Suspense>
      </ErrorBoundary>
      <Footer />
      <DarkModeButton />
    </main>
  );
}

export default App;
