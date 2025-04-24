export interface Product {
  id: number;
  name: string;
  image: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

// /{teamId}/products (GET)
export interface GetProductListResponse {
  nextCursor: number;
  list: Product[];
}

// /{teamId}/products (POST)
// /{teamId}/products/{productId} (PATCH)
export interface CreateProductRequest {
  name: string;
  description: string;
  image: string;
  categoryId: number;
}

export interface CategoryMetric {
  reviewCount: number;
  favoriteCount: number;
  rating: number;
}

export interface Category {
  id: number;
  name: string;
}

// /{teamId}/products (POST)
// /{teamId}/products/{productId} (GET)
// /{teamId}/products/{productId} (PATCH)
// /{teamId}/products/{productId}/favorite (POST)
// /{teamId}/products/{productId}/favorite (DELETE)
export interface ProductResponse extends Product {
  description: string;
  isFavorite: boolean;
  categoryMetric: CategoryMetric;
  category: Category;
}

// /{teamId}/products/{productId} (DELETE)
export interface DeleteProductResponse {
  id: number;
}

// /{teamId}/products/{productId}/reviews (GET)
export interface UserSummary {
  id: number;
  nickname: string;
  image: string;
}

export interface ReviewImage {
  id: number;
  source: string;
}

export interface ReviewListItem {
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

export interface GetReviewListResponse {
  nextCursor: number;
  list: ReviewListItem[];
}
