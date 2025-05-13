import { useForm } from 'react-hook-form';
import React from 'react';
import { SignUpRequest } from '@/types/auth';
import {
  EmailInput,
  NickNameInput,
  PasswordInput,
  ConfirmPasswordInput,
} from '@/components/input/loginInput';
import axiosInstance from '@/api/axiosInstance';
import router from 'next/router';

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<SignUpRequest>({ mode: 'onTouched' });

  const onSubmit = async (data: SignUpRequest) => {
    try {
      const response = await axiosInstance.post(`/auth/signup`, data);
      router.push('/');
      console.log('회원가입 성공:', response.data);
    } catch (error: any) {
      console.error('회원가입 실패:', error.response.data);

      const errorMessage = error.response?.data?.message;

      if (error.response?.status === 400) {
        if (errorMessage?.includes('이메일')) {
          setError('email', { message: errorMessage });
        } else if (errorMessage?.includes('닉네임')) {
          setError('nickname', { message: errorMessage });
        } else {
          setError('root', { message: errorMessage || '입력값을 다시 확인해주세요.' });
        }
      } else {
        setError('root', { message: '회원가입에 실패했습니다. 다시 시도해주세요.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-black-500 flex flex-col items-center justify-center">
      <header className="absolute top-4 left-4 text-white ">헤더</header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md md:max-w-lg lg:max-w-xl mx- p-8 rounded-lg shadow-lg"
      >
        <EmailInput register={register} errors={errors} type="signup" />
        <NickNameInput register={register} errors={errors} type="signup" />
        <PasswordInput register={register} errors={errors} type="signup" />
        <ConfirmPasswordInput register={register} errors={errors} watch={watch} type="signup" />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
