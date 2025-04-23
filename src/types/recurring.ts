export type FrequencyType = 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

// /{teamId}/groups/{groupId}/task-lists/{taskListId}/recurring (POST)
export interface PostRecurringRequest {
  name: string;
  description: string;
  startDate: string;
  frequency: FrequencyType;
  monthDay: number;
}

export interface PostRecurringResponse {
  id: number;
  name: string;
  description: string;
  frequencyType: FrequencyType;
  writerId: number;
  groupId: number;
  taskListId: number;
  monthDay: number;
  weekDays: number[];
  startDate: string;
  createdAt: string;
  updatedAt: string;
}
