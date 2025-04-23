export interface WriterSummary {
  id: number;
  nickname: string;
}

// /articles (Post)
export interface PostArticlesRequest {
  image: string;
  title: string;
  content: string;
}
// /articles (Post)
// /articles (GET)
export interface ArticlesResponse {
  id: number;
  title: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: WriterSummary;
}
// /articles/{articleId}/like (POST)
// /articles/{articleId}/like (DELETE)
// /articles/{articleId} (GET)
// /articles/{articleId} (PATCH)
export interface ArticleResponse {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
  writer: WriterSummary;
}
// /articles/{articleId} (PATCH)
export interface PatchArticleRequest {
  image: string;
  title: string;
  content: string;
}
