import axiosInstance from './axiosInstance';
import { GetUserRankingResponse } from '../types/user';

export const getUserRanking = async () => {
  const response = await axiosInstance.get<GetUserRankingResponse[]>('/users/ranking');
  return response.data;
};
