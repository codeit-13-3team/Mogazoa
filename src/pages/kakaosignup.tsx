// pages/signup/kakao.tsx
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { NickNameInput } from '@/components/input/loginInput';

interface FormValues {
  nickname: string;
}

const KakaoSignupPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      await axios.post(
        '/api/auth/kakao/signup',
        { nickname: data.nickname },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      router.push('/'); // 회원가입 후 홈으로 이동
    } catch (err) {
      console.error(err);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-black-500 flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md p-8 rounded-lg shadow-lg"
      >
        <NickNameInput register={register} errors={errors} />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          가입하기
        </button>
      </form>
    </div>
  );
};

export default KakaoSignupPage;
