import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NickNameInput } from '@/components/input/loginInput';
import Button from '@/components/button/Button';
import axiosInstance from '@/api/axiosInstance';

interface FormValues {
  nickname: string;
}

const KakaoSignupPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI;

  const onSubmit = async ({ nickname }: FormValues) => {
    if (!code || typeof code !== 'string') {
      setError('nickname', {
        message: '인가 코드가 없습니다. 다시 로그인해주세요.',
      });
      return;
    }

    try {
      setIsLoading(true);

      await axiosInstance.post(
        `/auth/signUp/kakao`,
        {
          nickname,
          redirectUri,
          token: code,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      router.push('/');
    } catch (error: any) {
      const message = error?.response?.data?.message;
      console.error('회원가입 실패:', message);

      setError('nickname', {
        message: message?.includes('닉네임')
          ? message
          : '회원가입에 실패했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-center mt-20 p-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md sm:max-w-lg md:max-w-xl space-y-4"
        >
          <NickNameInput register={register} errors={errors} />
          <Button size="l" type="submit" className="w-full">
            가입하기
          </Button>
        </form>
      </div>
    </main>
  );
};

export default KakaoSignupPage;
