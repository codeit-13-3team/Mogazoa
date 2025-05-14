
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

  useEffect(() => {
    // 로그인 상태 복원
    const stored = localStorage.getItem('isLoggedIn');
    if (stored === 'true') {
      setIsLoggedIn(true);
    }

    // 다른 탭에서 로그아웃 등 변경 시 상태 반영
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
<<<<<<< HEAD
      <div className="min-h-screen">
        {!is404Page && <NavBar showSearch={pageProps.showSearch} />}
        <main className="p-6">
          <Component {...pageProps} />
        </main>
      </div>
=======
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

>>>>>>> 898b39a23d7185607c10b534c9f9a3f256672c0a
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}