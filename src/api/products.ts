import axiosInstance from './axiosInstance';
import { GetProductListResponse, ProductResponse, CreateProductRequest } from '../types/product';

export const getProductList = async (
  keyword?: string | number,
  category?: number | null,
  order?: string | null,
  cursor?: number | null,
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

export const getProductById = async (productId: number) => {
  const response = await axiosInstance.get<ProductResponse>(`/products/${productId}`);
  return response.data;
};

export const createProduct = async (body: CreateProductRequest) => {
  const response = await axiosInstance.post<ProductResponse>('/products', body);
  return response.data;
};

export const updateProduct = (productId: number, body: CreateProductRequest) => {
  axiosInstance.patch(`/products/${productId}`, body);
};
