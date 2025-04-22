export interface UserSummary {
  id: number;
  nickname: string;
  image: string;
}

export interface RecurringTask {
  id: number;
  name: string;
  description: string;
  frequency: string;
  commentCount: number;
  recurringId: number;
  displayIndex: number;
  date: string;
  doneAt: string;
  deletedAt: string;
  updatedAt: string;
  writer: UserSummary;
  doneBy: {
    user: UserSummary;
  };
}

// /groups/{groupId}/task-lists/{id}
export interface GetTaskListByIdResponse {
  id: number;
  name: string;
  groupId: number;
  displayIndex: number;
  createdAt: string;
  updatedAt: string;
  tasks: RecurringTask[];
}
// /groups/{groupId}/task-lists/{id} (PATCH)
export interface PatchTaskListByIdRequest {
  name: string;
}
// /groups/{groupId}/task-lists (POST)
export interface PostTaskListRequest {
  name: string;
}
export interface PostTaskListResponse {
  id: number;
  name: string;
  displayIndex: number;
  groupId: number;
  createdAt: string;
  updatedAt: string;
}
// /groups/{groupId}/task-lists/{id}/order (PATCH)
export interface PatchTaskListByIdOrderRequest {
  id: number;
  name: string;
  groupId: number;
  displayIndex: number;
  createdAt: string;
  updatedAt: string;
}
