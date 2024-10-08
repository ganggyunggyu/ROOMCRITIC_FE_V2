import './styles/App.css';
import { Suspense } from 'react';
import Header from './header';
import DarkModeButton from './dark-mode-button';
import Routing from '../pages';
import ErrorProvider from './error-provider';
import Fullback from './full-back';
import { DetailBackground } from '../pages/ui';
import { AppProvider } from './app-provider';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppSelector } from '../shared/store';

function App() {
  const { backgroundPath } = useAppSelector((state) => state.backgroundPath);

  return (
    <AppProvider>
      <Header />
      <DetailBackground path={backgroundPath} />
      <ErrorBoundary fallback={<ErrorProvider />}>
        <Suspense fallback={<Fullback />}>
          <Routing />
        </Suspense>
      </ErrorBoundary>
      <DarkModeButton />
    </AppProvider>
  );
}

export default App;
