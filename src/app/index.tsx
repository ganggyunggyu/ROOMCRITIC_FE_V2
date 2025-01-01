import './styles/App.css';
import { Suspense } from 'react';
import Header from './header';
import DarkModeButton from './dark-mode-button';
import Routing from '../pages';
import ErrorProvider from './error-provider';
import Fullback from './full-back';
import { DetailBackground } from '../widgets/detail-background';
import { AppProvider } from './app-provider';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppSelector } from './store';
import { RightSideBar } from '@/widgets/right-sidebar';

function App() {
  const { backgroundPath } = useAppSelector((state) => state.backgroundPath);
  const { isRightSideBar } = useAppSelector((state) => state.sidebar);

  return (
    <AppProvider>
      <Header />
      {isRightSideBar && <RightSideBar />}
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
