import { apiClient } from '../api';

export interface Review {
  id: number;
  name: string;
  comment: string;
  star: number;
  img_url: string;
}

export interface ReviewParams {
  search?: string;
  page?: number;
  limit?: number;
}

export class ReviewService {
  static async getReviews(params?: ReviewParams): Promise<{ reviews: Review[]; pagination: any }> {
    const response = await apiClient.get<{ reviews: Review[]; pagination: any }>('/review', params);
    return { reviews: response.data.reviews, pagination: response.data.pagination };
  }

  static async getReview(id: number): Promise<Review> {
    const response = await apiClient.get<{ review: Review }>(`/review/${id}`);
    return response.data.review;
  }

  static async createReview(data: Omit<Review, 'id'>): Promise<Review> {
    const response = await apiClient.post<Review>('/review', data);
    return response.data;
  }

  static async updateReview(id: number, data: Partial<Omit<Review, 'id'>>): Promise<Review> {
    const response = await apiClient.put<Review>(`/review/${id}`, data);
    return response.data;
  }

  static async deleteReview(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/review/${id}`);
    return response.data;
  }
} 