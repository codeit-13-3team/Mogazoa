import axiosInstance from "./axiosInstance";

export const followUser = async (userId: number) => {
  const response = await axiosInstance.post('/follow', userId);
  return response.data;
};

export const unfollowUser = async (userId: number) => {
  const response = await axiosInstance.delete('/follow', { data: { userId } } as any);
  return response.data;
};