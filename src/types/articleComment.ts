export interface UserSummary {
  id: number;
  nickname: string;
  image: string;
}

export interface CommentWithWriter {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: UserSummary;
}

// /articles/{articleId}/comments (POST)
export interface PostArticleCommentsRequest {
  content: string;
}
export interface PostArticleCommentsResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: UserSummary;
}
// /articles/{articleId}/comments (GET)
export interface GetArticleCommentsListResponse {
  nextCursor: number | null;
  list: CommentWithWriter[];
}
// /comments/{commentId} (PATCH)
export interface PatchArticleCommentsRequest {
  content: string;
}
export interface PatchArticleCommentsResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: UserSummary;
}
