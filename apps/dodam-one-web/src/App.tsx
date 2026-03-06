import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProviderContainer from './components/Common/ThemeProviderContainer';
import Routes from './components/Router/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProviderContainer>
        <ToastContainer autoClose={1000} limit={1} />
        <Routes />
      </ThemeProviderContainer>
    </QueryClientProvider>
  );
}

export default App;
