// /{teamId}/auth/signUp (POST)
export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  passwordConfirmation: string;
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

// /{teamId}/auth/signIn/{provider} (POST)
export interface SignInWithProviderRequest {
  redirectUri: string;
  token: string;
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
