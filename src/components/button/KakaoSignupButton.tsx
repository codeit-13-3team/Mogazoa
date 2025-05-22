import { getKakaoSignupAuthUrl } from '@/lib/kakaoSignupAuth';
import { useRouter } from 'next/navigation';
import Button from './Button';

export const KakaosignupButton = () => {
  const router = useRouter();

  const handleKakaoLogin = () => {
    const kakaoUrl = getKakaoSignupAuthUrl();
    router.push(kakaoUrl);
  };

  return (
    <Button size="l" type="button" onClick={handleKakaoLogin}>
      카카오 회원가입하러 가기
    </Button>
  );
};
