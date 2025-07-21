import { apiClient } from '../api';

export interface Scent {
  id: number;
  name: string;
  description: string;
  material: string;
  intensity: string;
  capacity: string;
  img_url: string;
  categoryId: number;
}

export interface ScentParams {
  search?: string;
  page?: number;
  limit?: number;
}

export class ScentService {
  static async getScents(params?: ScentParams): Promise<{ scents: Scent[]; pagination: any }> {
    const response = await apiClient.get<{ scents: Scent[]; pagination: any }>('/scent', params);
    return { scents: response.data.scents, pagination: response.data.pagination };
  }

  static async getScent(id: number): Promise<Scent> {
    const response = await apiClient.get<Scent>(`/scent/${id}`);
    return response.data;
  }

  static async createScent(data: Omit<Scent, 'id'>): Promise<Scent> {
    const response = await apiClient.post<Scent>('/scent', data);
    return response.data;
  }

  static async updateScent(id: number, data: Partial<Omit<Scent, 'id'>>): Promise<Scent> {
    const response = await apiClient.put<Scent>(`/scent/${id}`, data);
    return response.data;
  }

  static async deleteScent(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/scent/${id}`);
    return response.data;
  }
} 