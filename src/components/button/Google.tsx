import Image from 'next/image';
import googleIcon from '../../../public/icon/common/google.png';

export const GoogleLoginButton = () => {
  return (
    <button
      onClick={GoogleLoginButton}
      className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3"
    >
      <Image src={googleIcon} alt="구글 로그인" width={30} />
    </button>
  );
};