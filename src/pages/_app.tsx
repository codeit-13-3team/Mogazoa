import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
  // 404 페이지 확인 로직
  const is404Page =
    Component.name === 'Error404' ||
    Component.displayName === 'Error404' ||
    pageProps?.statusCode === 404;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-950 text-white min-h-screen">
        {/* NavBar는 404 페이지가 아닐 때만 렌더링 */}
        {!is404Page && <NavBar showSearch={pageProps.showSearch} />}
        <main className="p-6">
          <Component {...pageProps} />
        </main>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
