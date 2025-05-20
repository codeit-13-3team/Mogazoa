import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { NickNameInput } from '@/components/input/loginInput';
import axiosInstance from '@/api/axiosInstance';
import { useState } from 'react';
import Button from '@/components/button/Button';

interface FormValues {
  nickname: string;
}

const KakaoSignupPage = () => {
  const router = useRouter();
  const { code } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setError('nickname', { message: 'accessToken이 없습니다. 로그인부터 다시 시도해주세요.' });
        return;
      }

      setIsLoading(true);

      // 회원가입 요청
      await axiosInstance.post(
        '/auth/signUp/kakao',
        {
          nickname: data.nickname,
          redirectUri: 'http://localhost:3000/kakao',
          token: accessToken,
        },

        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      console.log('accessToken:', accessToken);
      localStorage.setItem('accessToken', accessToken);
      router.push('/');
    } catch (error: any) {
      console.error('회원가입 실패:', error.response?.data);
      const message = error.response?.data?.message;

      if (message?.includes('닉네임')) {
        setError('nickname', { message });
      } else {
        setError('nickname', { message: '회원가입에 실패했습니다. 다시 시도해주세요.' });
      }
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
