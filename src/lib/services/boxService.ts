import { apiClient } from '../api';

export interface Box {
  id: number;
  name: string;
  description: string;
  material: string;
  size: string;
  capacity: string;
  cost: string;
  img_url: string;
  categoryId: number;
}

export interface BoxParams {
  search?: string;
  page?: number;
  limit?: number;
}

export class BoxService {
  static async getBoxes(params?: BoxParams): Promise<{ boxes: Box[]; pagination: any }> {
    const response = await apiClient.get<{ boxes: Box[]; pagination: any }>('/box', params);
    return { boxes: response.data.boxes, pagination: response.data.pagination };
  }

  static async getBox(id: number): Promise<Box> {
    const response = await apiClient.get<Box>(`/box/${id}`);
    return response.data;
  }

  static async createBox(data: Omit<Box, 'id'>): Promise<Box> {
    const response = await apiClient.post<Box>('/box', data);
    return response.data;
  }

  static async updateBox(id: number, data: Partial<Omit<Box, 'id'>>): Promise<Box> {
    const response = await apiClient.put<Box>(`/box/${id}`, data);
    return response.data;
  }

  static async deleteBox(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/box/${id}`);
    return response.data;
  }
} 