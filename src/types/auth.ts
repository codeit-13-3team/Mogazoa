// /{teamId}/auth/signUp (POST)
export interface SignUpFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
}
export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

// /{teamId}/auth/signIn (POST)
export interface SignInRequest {
  email: string;
  password: string;
}

// /{teamId}/auth/signUp/{provider} (POST)
export interface SignUpWithProviderRequest {
  nickname: string;
  redirectUri: string;
  token: string;
}
//kakao
export interface KakaoSignUpRequest {
  accessToken(arg0: string, accessToken: any): unknown;
  nickname: string;
  token: string;
  redirectUri: string;
}
export interface KakaoLoginResponse {
  accessToken: string;
  user: {
    id: number;
    nickname: string;
    image: string | null;
    createdAt: string;
    // 필요한 필드 더 추가 가능
  };
}
// /{teamId}/auth/signIn/{provider} (POST)
export interface SignInWithProviderRequest {
  redirectUri: string;
  token: string;
}
export interface AuthResponse {
  nickname: string;
  accessToken: string;
}

export interface AuthUser {
  id: number;
  email: string;
  description: string;
  image: string | null;
  teamId: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
}

// /{teamId}/auth/signUp (POST)
// /{teamId}/auth/signIn (POST)
// /{teamId}/auth/signUp/{provider} (POST)
// /{teamId}/auth/signIn/{provider} (POST)
export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}
