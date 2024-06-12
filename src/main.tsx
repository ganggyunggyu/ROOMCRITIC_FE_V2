import ReactDOM from 'react-dom/client';
import App from './app/index.tsx';
import './app/styles/index.css';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { store } from './app/store/index.ts';
import { Interceptor } from './app/axios-interceptor';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Interceptor>
          <ReactQueryDevtools />
          <App />
        </Interceptor>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>,
);
