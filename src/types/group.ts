export type Role = 'ADMIN' | 'MEMBER' | 'GUEST';
export type TaskFrequency = 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface UserSummary {
  id: number;
  nickname: string;
  image: string;
}

export interface GroupMember {
  role: Role;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

export interface TaskList {
  id: number;
  name: string;
  displayIndex: number;
  groupId: number;
  createdAt: string;
  updatedAt: string;
  tasks: string[];
}

// /groups/{id} (GET)
export interface GetGroupsResponse {
  id: number;
  teamId: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  members: GroupMember[];
  taskLists: TaskList[];
}

// /groups (PATCH)
export interface PatchGroupsRequest {
  name: string;
  image: string;
}
export interface PatchGroupsResponse {
  id: number;
  teamId: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// /groups (POST)
export interface PostGroupsRequest {
  name: string;
  image: string;
}
export interface PostGroupsResponse {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
// /groups/{id}/member/{memberUserId}
export interface GetGroupMemberResponse {
  role: Role;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}
// /groups/accept-invitation
export interface PostGroupsAcceptInvitationRequest {
  userEmail: string;
  token: string;
}
export interface PostGroupsAcceptInvitationResponse {
  groupId: number;
}
// /groups/{id}/member
export interface PostGroupsMemberRequest {
  userEmail: string;
}
// /groups/{id}/task
export interface GetGroupsTaskResponse {
  id: number;
  name: string;
  description: string;
  frequency: TaskFrequency;
  recurringId: number;
  displayIndex: number;
  commentCount: number;
  date: string;
  doneAt: string;
  deletedAt: string;
  updatedAt: string;
  writer: UserSummary;
  doneBy: {
    user: UserSummary;
  };
}
