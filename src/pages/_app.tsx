// src/pages/_app.tsx

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ModalProvider } from '@/context/ModalContext';
import ModalRoot from '@/components/ModalRoot';
import FloatingAddButton from '@/components/AddButton';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

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
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <div className="max-w-[1554px] mx-auto">
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />

          <FloatingAddButton />

          <ModalRoot />
        </div>
      </ModalProvider>
    </QueryClientProvider>
  );
}
