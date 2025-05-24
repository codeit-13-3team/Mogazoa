import axiosInstance from './axiosInstance';
import { CreateReviewRequest, ReviewResponse } from '@/types/review';

export const createReview = async (body: CreateReviewRequest) => {
  try {
    const response = await axiosInstance.post<ReviewResponse>('/reviews', body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
