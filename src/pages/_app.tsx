import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ModalProvider } from '@/context/ModalContext';
import ModalRoot from '@/components/ModalRoot';
import FloatingAddButton from '@/components/AddButton';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '@/components/NavBar';
import useAuthStore from '@/stores/authStores';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => { 
    const stored = localStorage.getItem('isLoggedIn');
    if (stored === 'true') {
      setIsLoggedIn(true);
    }
 
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'isLoggedIn') {
        setIsLoggedIn(event.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [setIsLoggedIn]);

  const is404Page =
    Component.name === 'Error404' ||
    Component.displayName === 'Error404' ||
    pageProps?.statusCode === 404;

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <div className="min-h-screen">
          {!is404Page && <NavBar showSearch={pageProps.showSearch} />}
          <main className="p-6">
            <Component {...pageProps} />
          </main>
          {!is404Page && isLoggedIn && <FloatingAddButton />}
          <ModalRoot />
        </div>
      </ModalProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}