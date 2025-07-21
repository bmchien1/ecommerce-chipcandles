import { apiClient } from '../api';

export interface Mold {
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

export interface MoldParams {
  search?: string;
  page?: number;
  limit?: number;
}

export class MoldService {
  static async getMolds(params?: MoldParams): Promise<{ molds: Mold[]; pagination: any }> {
    const response = await apiClient.get<{ molds: Mold[]; pagination: any }>('/mold', params);
    return { molds: response.data.molds, pagination: response.data.pagination };
  }

  static async getMold(id: number): Promise<Mold> {
    const response = await apiClient.get<Mold>(`/mold/${id}`);
    return response.data;
  }

  static async createMold(data: Omit<Mold, 'id'>): Promise<Mold> {
    const response = await apiClient.post<Mold>('/mold', data);
    return response.data;
  }

  static async updateMold(id: number, data: Partial<Omit<Mold, 'id'>>): Promise<Mold> {
    const response = await apiClient.put<Mold>(`/mold/${id}`, data);
    return response.data;
  }

  static async deleteMold(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/mold/${id}`);
    return response.data;
  }
} 