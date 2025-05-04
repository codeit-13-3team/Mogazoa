import { useForm } from 'react-hook-form';
import { EmailInput, PasswordInput } from '@/components/input/loginInput';
import { KakaoLoginButton } from '@/components/button/KakaoButton';
import { GoogleLoginButton } from '@/components/button/Google';
import { Login } from '@/api/auth';
import { LoginRequest } from '@/api/auth';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: 'onBlur',
  });
  const Router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (formData: LoginRequest) => Login('login', formData),
    onSuccess: (data: { accessToken: string }) => {
      localStorage.setItem('token', data.accessToken);
      Router.push('/');
    },
    onError: () => {
      alert('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
    },
  });

  const onSubmit = (formData: LoginRequest) => {
    mutate(formData);
  };

  return (
    <div className="items-center justify-center min-h-screen bg-black-500">
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4 max-w-sm mx-auto mt-10">
        <h1 className="text-xl font-bold font-">로그인</h1>
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
