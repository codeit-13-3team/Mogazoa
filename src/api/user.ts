import axiosInstance from './axiosInstance';
import { GetFolloweeListResponse, GetUserRankingResponse } from '../types/user';

export const getUserRanking = async () => {
  const response = await axiosInstance.get<GetUserRankingResponse[]>('/users/ranking');
  return response.data;
};

export const getFollowersList = async (userId: number) => {
  const response = await axiosInstance.get<GetFolloweeListResponse>(`/users/${userId}/followers`);
  return response.data;
};