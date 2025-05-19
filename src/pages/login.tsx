import { useForm } from 'react-hook-form';
import { EmailInput, PasswordInput } from '@/components/input/loginInput';
import { KakaoButton } from '@/components/button/KakaoButton';
import { GoogleLoginButton } from '@/components/button/Google';
import { Login } from '@/api/auth';
import { SignInRequest } from '@/types/auth';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/stores/authStores';
import Button from '@/components/button/Button';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInRequest>({
    mode: 'onBlur',
  });
  const Router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (formData: SignInRequest) => Login('login', formData),
    onSuccess: (data: { accessToken: string }) => {
      localStorage.setItem('token', data.accessToken);
      Router.push('/');
    },
    onError: () => {
      alert('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
    },
  });

  const onSubmit = (formData: SignInRequest) => {
    if (isSubmitting) return;
    mutate(formData);
  };

  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-center mt-20 p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md sm:max-w-lg md:max-w-xl space-y-4"
        >
          <EmailInput register={register} errors={errors} type="login" />
          <PasswordInput register={register} errors={errors} type="login" />
          <Button type="submit" size="l" className="w-full">
            {isSubmitting ? '처리 중...' : '로그인'}
          </Button>
        </form>
        <div className="flex justify-center  mt-4 text-gray-200">SNS로 바로 시작하기</div>
        <div className="flex justify-center mt-4 space-x-4">
          <GoogleLoginButton />
          <KakaoButton />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
