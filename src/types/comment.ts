export interface UserSummary {
  id: number;
  nickname: string;
  image: string;
}

// /tasks/{taskId}/comments (POST)
// /tasks/{taskId}/comments/{commentId} (PATCH)
export interface PostTaskCommentsRequest {
  content: string;
}
export interface PostTaskCommentsResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: UserSummary;
}
