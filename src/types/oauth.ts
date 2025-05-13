// /oauthApps
export interface OauthRequest {
  appKey: string;
  provider: string;
}

export interface OauthResponse {
  createdAt: string;
  updatedAt: string;
  appKey: string;
  provider: string;
  teamId: string;
  id: number;
}
