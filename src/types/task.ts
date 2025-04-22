export type FrequencyType = 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface UserSummary {
  id: number;
  nickname: string;
  image: string;
}

// /groups/{groupId}/task-lists/{taskListId}/tasks (POST)
export interface PostTaskRequest {
  name: string;
  description: string;
  startDate: string;
  frequencyType: FrequencyType;
  monthDay: number;
}
// /groups/{groupId}/task-lists/{taskListId}/tasks (GET)
// /groups/{groupId}/task-lists/{taskListId}/tasks/{taskId} (GET)
export interface GetTaskListTaskResponse {
  id: number;
  name: string;
  description: string;
  frequency: FrequencyType;
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
// /{teamId}/groups/{groupId}/task-lists/{taskListId}/tasks/{taskId} (PATCH)
export interface PatchTaskListTaskByIdRequest {
  name: string;
  description: string;
  done: boolean;
}
// /{teamId}/groups/{groupId}/task-lists/{taskListId}/tasks/{id}/order (PATCH)
export interface PatchTaskListTaskByIdOrderRequest {
  displayIndex: number;
}
