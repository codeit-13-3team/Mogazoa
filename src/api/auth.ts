import axiosInstance from './axiosInstance';
import { teamId } from './axiosInstance';

interface SignupResponse {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    nickname: string;
    image: string;
  };
}

interface KakaoSignUpResponse {
  redirectUri: string;
  token: string;
  nickname: string;
}
const PROVIDER = 'kakao';

export const Signup = async (data: SignupResponse): Promise<SignupResponse> => {
  try {
    const response = await axiosInstance.post<SignupResponse>(`${teamId}/auth/signup`, data);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const Login = async (p0: string, data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(`${teamId}/auth/signIn`, data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const KakaoSignUp = async (data: KakaoSignUpResponse) => {
  const url = `${teamId}/auth/signUp/${PROVIDER}`;
  console.log('🔍 요청 URL:', url);
  console.log('📦 요청 데이터:', data);
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const kakaoLogin = async (code: string) => {
  const response = await axiosInstance.post(`${teamId}/auth/signIn/${PROVIDER}`, {
    code,
  });
  return response.data;
};
