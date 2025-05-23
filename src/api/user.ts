import axiosInstance from './axiosInstance';
import { GetFolloweeListResponse, GetMeResponse, GetUserRankingResponse } from '../types/user';
import { GetProductListResponse } from '@/types/product';

export const getUserRanking = async () => {
  const response = await axiosInstance.get<GetUserRankingResponse[]>('/users/ranking');
  return response.data;
};

export const getMyProfile = async () => {
  const response = await axiosInstance.get<GetMeResponse>('/users/me');
  return response.data;
};

export const patchMyProfile = async (description: string, nickname: string, image: string) => {
  const response = await axiosInstance.patch('/users/me', { description, nickname, image })
  return response.data;
};

export const getUserProfile = async (userId: string) => {
  const response = await axiosInstance.get<GetMeResponse>(`/users/${userId}`);
  return response.data;
};

export const getFollowersList = async (userId: number) => {
  const response = await axiosInstance.get<GetFolloweeListResponse>(`/users/${userId}/followers`);
  return response.data;
};

export const getUserReviewedProducts = async (userId: string) => {
  const response = await axiosInstance.get<GetProductListResponse>(`/users/${userId}/reviewed-products`);
  return response.data;
};

export const getUserCreatedProducts = async (userId: string) => {
  const response = await axiosInstance.get<GetProductListResponse>(`/users/${userId}/created-products`);
  return response.data;
};

export const getUserFavoriteProducts = async (userId: string) => {
  const response = await axiosInstance.get<GetProductListResponse>(`/users/${userId}/favorite-products`);
  return response.data;
};