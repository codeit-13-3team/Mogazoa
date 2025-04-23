export interface Group {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
}

export interface Membership {
  group: Group;
  role: string;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

// User
export interface GetUserResponse {
  teamId: string;
  image: string;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  id: number;
  memberships: Membership[];
}
// PatchUser
export interface PatchUserRequest {
  nickname: string;
  image: string;
}
// /user/groups
export interface GetGroupResponse {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
}
// /user/membership
export interface GetMembershipResponse {
  group: Group;
  role: string;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

export interface TaskDone {
  id: number;
  name: string;
  description: string;
  frequency: string;
  writerId: number;
  userId: number;
  recurringId: number;
  displayIndex: number;
  date: string;
  doneAt: string;
  deletedAt: string;
  updatedAt: string;
}
// /user/history
export interface GetHistoryResponse {
  taskDone: TaskDone[];
}
// /user/send-reset-password-email
export interface PostResetPasswordRequest {
  email: string;
  redirectUrl: string;
}
export interface PostResetPasswordResponse {
  message: string;
}
// /user/reset-password
export interface PatchResetPasswordRequest {
  passwordConfirmation: string;
  password: string;
  token: string;
}
// /user/password
export interface PatchPasswordRequest {
  passwordConfirmation: string;
  password: string;
}
