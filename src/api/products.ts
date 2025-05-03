import axiosInstance from './axiosInstance';
import { GetProductListResponse } from '../types/product';

export const getProductList = async (
  keyword: string,
  category: number | null,
  order: string | null,
  cursor: number | null,
) => {
  const response = await axiosInstance.get<GetProductListResponse>('/products', {
    params: {
      keyword,
      category,
      order,
      cursor,
    },
  });
  return response.data;
};
