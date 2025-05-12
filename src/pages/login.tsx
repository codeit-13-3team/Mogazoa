import { useForm } from 'react-hook-form';
import { EmailInput, PasswordInput } from '@/components/input/loginInput';
import { KakaoLoginButton } from '@/components/button/KakaoButton';
import { GoogleLoginButton } from '@/components/button/Google';
import { Login } from '@/api/auth';
import { SignInRequest } from '@/types/auth';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>({
    mode: 'onBlur',
  });
  const Router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (formData: SignInRequest) => Login('login', formData),
    onSuccess: (data: { accessToken: string }) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.accessToken);
        Router.push('/');
      }
    },
    onError: () => {
      alert('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
    },
  });

  const onSubmit = (formData: SignInRequest) => {
    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-black-500 flex flex-col items-center justify-center">
      <header className="absolute top-4 left-4 text-white">헤더</header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" space-y-6 w-full max-w-md md:max-w-lg lg:max-w-xl mx- p-8 rounded-lg shadow-lg"
      >
        <EmailInput register={register} errors={errors} type="login" />
        <PasswordInput register={register} errors={errors} type="login" />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          로그인
        </button>
      </form>
      <div className="flex justify-center  mt-4 text-gray-200">SNS로 바로 시작하기</div>
      <div className="flex justify-center mt-4 space-x-4">
        <GoogleLoginButton />
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
