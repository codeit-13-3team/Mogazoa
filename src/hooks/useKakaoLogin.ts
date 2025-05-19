import { useQuery } from '@tanstack/react-query';
import { kakaoLogin } from '@/api/auth';
import { KakaoLoginResponse } from '@/types/auth';

export const useKakaoLogin = (code: string) => {
  return useQuery<KakaoLoginResponse, Error>({
    queryKey: ['kakao-login', code],
    queryFn: async () => {
      if (!code) throw new Error('code가 없습니다');
      return await kakaoLogin(code);
    },
    enabled: !!code,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
