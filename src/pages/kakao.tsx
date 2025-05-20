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

  const { data, isLoading, isError, error } = useKakaoLogin(code as string);

  useEffect(() => {
    if (isError && error) {
      const err = error as any;

      if (
        err.response?.status === 403 &&
        err.response?.data?.message === '등록되지 않은 사용자입니다.'
      ) {
        const accessToken = err.response?.data?.accessToken;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        }

        router.push(`/oauth/signup/kakao?code=${code}`);
        return;
      }
    }

    if (data) {
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);
      router.push('/');
    }
  }, [data, isError, router]);

  if (!code) return null;

  if (isLoading) return <div>로그인 처리 중...</div>;
  if (isError)
    return (
      <div>
        등록된 회원이 아닙니다.
        <br /> 로그인페이지로 이동합니다
      </div>
    );

  return null;
};

export default KakaoRedirectPage;
