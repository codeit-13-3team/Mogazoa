import axiosInstance from './axiosInstance';
import { SignUpRequest, SignInRequest } from '@/types/auth';
import { KakaoSignUpRequest, KakaoLoginResponse } from '@/types/auth';

const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export const Signup = async (data: SignUpRequest): Promise<SignUpRequest> => {
  try {
    const response = await axiosInstance.post<SignUpRequest>(`/auth/signup`, data);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const Login = async (
  p0: string, // teamId: string,
  formData: SignInRequest,
): Promise<{ accessToken: string }> => {
  try {
    const response = await axiosInstance.post<{ accessToken: string }>(`/auth/signIn`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const kakaoLogin = async (token: string): Promise<KakaoLoginResponse> => {
  const response = await axiosInstance.post<KakaoLoginResponse>('/auth/signIn/kakao', {
    redirectUri,
    token,
  });
  console.log('✅ 카카오 로그인 응답:', response.data);
  return response.data;
};

export const kakaoSignup = async (token: string, nickname: string) => {
  const response = await axiosInstance.post('/auth/signUp/kakao', {
    nickname,
    redirectUri,
    token,
  });
  return response.data;
};