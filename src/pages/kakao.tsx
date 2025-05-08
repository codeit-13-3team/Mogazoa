import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // 리액트 돔설치
import axios from 'axios';

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) return;

    axios
      .post('/api/auth/kakao', { code }) // 백엔드 요청
      .then((res) => {
        console.log('로그인 성공', res.data);
        navigate('/');
      })
      .catch((err) => {
        console.error('카카오 로그인 실패', err);
      });
  }, [code, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;
