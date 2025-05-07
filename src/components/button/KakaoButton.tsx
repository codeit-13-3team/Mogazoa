import Image from 'next/image';
import kakaoIcon from '../../../public/icon/common/kakao.png';

export const KakaoLoginButton = () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
  const REDIRECT_URI = 'http://localhost:3000/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button onClick={handleLogin}>
      <Image src={kakaoIcon} alt="카카오 로그인" width={30} />
    </button>
  );
};
