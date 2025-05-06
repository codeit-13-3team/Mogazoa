import axiosInstance from './axiosInstance';
import { CategoryListResponse } from '../types/category';

export const getCategoryList = async () => {
  const response = await axiosInstance.get<CategoryListResponse>('/categories');
  return response.data;
};
