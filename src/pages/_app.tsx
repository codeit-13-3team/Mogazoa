// src/pages/_app.tsx

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ModalProvider } from '@/context/ModalContext';
import ModalRoot from '@/components/ModalRoot';
import FloatingAddButton from '@/components/AddButton';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '@/components/NavBar';  

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
  const is404Page =
    Component.name === 'Error404' ||
    Component.displayName === 'Error404' ||
    pageProps?.statusCode === 404;

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <div className="max-w-[1554px] mx-auto bg-slate-950 text-white min-h-screen">
          {/* NavBar는 404 페이지가 아닐 때만 렌더링 */}
          {!is404Page && <NavBar showSearch={pageProps.showSearch} />}

          <main className="p-6">
            <Component {...pageProps} />
          </main>

          {!is404Page && <FloatingAddButton />} {/* 404일 땐 버튼 안 보이게 해도 OK */}
          <ModalRoot />
        </div>
      </ModalProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}