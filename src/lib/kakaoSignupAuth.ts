export const getKakaoSignupAuthUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUrl = process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI;
  console.log('✅ clientId:', clientId); // 디버깅용
  console.log('✅ redirectUrl:', redirectUrl); // 디버깅용
  if (!clientId || !redirectUrl) {
    throw new Error('카카오 로그인 환경변수가 설정되지 않았습니다.');
  }

  return `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code`;
};
