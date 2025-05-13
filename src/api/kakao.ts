export const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
export const REDIRECT_URI = 'http://localhost:3000/kakao';
const handleKakaoLogin = () => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = kakaoAuthUrl;
};

export const getKakaoToken = async () => {
  const search = new URLSearchParams(window.location.search);
  const code = search.get('code');
  if (!code) return null;

  const param = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: KAKAO_REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code,
  });

  const response = await fetch(`https://kauth.kakao.com/oauth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: param.toString(),
  });
  const result = await response.json();
  console.log('result', result);
  return result;
};
