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
import Button from '@/components/button/Button';

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-center mt-20 p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md sm:max-w-lg md:max-w-xl space-y-4"
        >
          <EmailInput register={register} errors={errors} type="signup" />
          <NickNameInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} type="signup" />
          <ConfirmPasswordInput register={register} errors={errors} watch={watch} type="signup" />
          <Button type="submit" size="l" className="w-full">
            {isSubmitting ? '처리 중...' : '회원가입'}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
