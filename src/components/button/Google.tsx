import Image from 'next/image';
import googleIcon from '../../../public/icon/common/google.png';

export const GoogleLoginButton = () => {
  return (
    <button onClick={GoogleLoginButton}>
      <Image src={googleIcon} alt="구글 로그인" width={30} />
    </button>
  );
};
