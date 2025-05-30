import './styles/App.css';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useAppSelector } from './store';
import { AppProvider, ErrorProvider, AuthProvider } from './provider';

import { Routing } from '../pages';

import {
  DarkModeButton,
  Fullback,
  Header,
  DetailBackground,
  RightSideBar,
} from '@/widgets';

export const App = () => {
  const { backgroundPath } = useAppSelector((state) => state.backgroundPath);
  const { isRightSideBar } = useAppSelector((state) => state.sidebar);

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};
