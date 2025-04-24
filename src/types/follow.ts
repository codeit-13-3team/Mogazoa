// /{teamId}/follow (POST)
// /{teamId}/follow (DELETE)
export interface FollowRequest {
  userId: number;
}

export interface MostFavoriteCategory {
  id: number;
  name: string;
}

export interface FollowResponse {
  id: number;
  teamId: string;
  image: string;
  nickname: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  mostFavoriteCategory: MostFavoriteCategory;
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
}
