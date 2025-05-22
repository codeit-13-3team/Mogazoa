import React from 'react';
import { useRouter } from 'next/router';
import { useKakaoLogin } from '@/hooks/useKakaoLogin';
import { KakaosignupButton } from '@/components/button/KakaoSignupButton';
import useAuthStore from '@/stores/authStores';

const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;

const KakaoRedirectPage = () => {
  const router = useRouter();
  const { code } = router.query;

  const { data, isError, error, isLoading } = useKakaoLogin(code as string);

  const err = error as any;

  if (isLoading) return <div>로그인 처리 중입니다...</div>;

  if (
    isError &&
    err?.response?.status === 403 &&
    err?.response?.data?.message === '등록되지 않은 사용자입니다.'
  ) {
    return (
      <main className="min-h-screen">
        <div className="flex flex-col items-center justify-center mt-20 p-6 text-center text-white">
          <KakaosignupButton />
        </div>
      </main>
    );
  }

  if (data) {
    const { accessToken } = data;
    localStorage.setItem('accessToken', accessToken);
    setIsLoggedIn(true);
    router.push('/');
  }

  return null;
};

export default KakaoRedirectPage;
