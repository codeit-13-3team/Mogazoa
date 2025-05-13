export interface UserSummary {
  id: number;
  nickname: string;
  image: string;
}

export interface ReviewImage {
  id: number;
  source: string;
}

// /{teamId}/reviews/{reviewId}/like (POST)
// /{teamId}/reviews/{reviewId}/like (DELETE)
// /{teamId}/reviews (POST)
// /{teamId}/reviews/{reviewId} (PATCH)
export interface ReviewResponse {
  id: number;
  productId: number;
  userId: number;
  user: UserSummary;
  reviewImages: ReviewImage[];
  content: string;
  rating: number;
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

// /{teamId}/reviews (POST)
export interface CreateReviewRequest {
  productId: number;
  images: string[];
  content: string;
  rating: number;
}

// /{teamId}/reviews/{reviewId} (DELETE)
export interface DeleteReviewResponse {
  id: number;
  productId: number;
  userId: number;
  content: string;
  rating: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

// /{teamId}/reviews/{reviewId} (PATCH)
export interface ExistingReviewImage {
  id: number;
}

// /{teamId}/reviews/{reviewId} (PATCH)
export interface NewReviewImage {
  source: string;
}
// /{teamId}/reviews/{reviewId} (PATCH)
export type ReviewImageInput = ExistingReviewImage | NewReviewImage;

// /{teamId}/reviews/{reviewId} (PATCH)
export interface UpdateReviewRequest {
  content: string;
  rating: number;
  images: ReviewImageInput[];
}
