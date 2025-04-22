// /oauthApps
export interface OauthRequest {
  appSecret: string;
  appKey: string;
  provider: string;
}

export interface OauthResponse {
  createdAt: string;
  updatedAt: string;
  appSecret: string;
  appKey: string;
  provider: string;
  teamId: string;
  id: number;
}
