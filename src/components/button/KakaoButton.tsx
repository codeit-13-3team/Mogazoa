import Image from 'next/image';
import kakaoIcon from '../../../public/icon/common/kakao.png';
import { getKakaoAuthUrl } from '@/lib/kakaoAuth';
import { useRouter } from 'next/navigation';

export const KakaoButton = () => {
  const router = useRouter();

  const handleKakaoLogin = () => {
    const kakaoUrl = getKakaoAuthUrl();
    router.push(kakaoUrl);
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3"
    >
      <Image src={kakaoIcon} alt="kakao" width={24} height={24} />
    </button>
  );
};