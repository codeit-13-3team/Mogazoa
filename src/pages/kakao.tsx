import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useKakaoLogin } from '@/hooks/useKakaoLogin';

const KakaoRedirectPage = () => {
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const urlCode = new URL(window.location.href).searchParams.get('code');
    setCode(urlCode);
  }, []);

  const { data, isLoading, isError } = useKakaoLogin(code);

  useEffect(() => {
    if (data) {
      const { accessToken, user } = data;
      localStorage.setItem('accessToken', accessToken);

      if (!user.nickname || user.nickname.trim() === '') {
        router.push('/kakaosignup');
      } else {
        router.push('/');
      }
    }
  }, [data, router]);

  // ✅ SSR 시점에서 HTML mismatch를 방지하기 위해 null 처리
  if (!code) return null;

  if (isLoading) return <div>로그인 처리 중...</div>;
  if (isError) return <div>카카오 로그인 실패. 다시 시도해주세요.</div>;

  return null;
};

export default KakaoRedirectPage;
