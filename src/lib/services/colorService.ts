import { apiClient } from '../api';

export interface Color {
  id: number;
  name: string;
  description: string;
  material: string;
  img_url: string;
  categoryId: number;
}

export interface ColorParams {
  search?: string;
  page?: number;
  limit?: number;
}

export class ColorService {
  static async getColors(params?: ColorParams): Promise<{ colors: Color[]; pagination: any }> {
    const response = await apiClient.get<{ colors: Color[]; pagination: any }>('/color', params);
    console.log(response);
    return { colors: response.data.colors, pagination: response.pagination };
  }

  static async getColor(id: number): Promise<Color> {
    const response = await apiClient.get<Color>(`/color/${id}`);
    return response.data;
  }

  static async createColor(data: Omit<Color, 'id'>): Promise<Color> {
    const response = await apiClient.post<Color>('/color', data);
    return response.data;
  }

  static async updateColor(id: number, data: Partial<Omit<Color, 'id'>>): Promise<Color> {
    const response = await apiClient.put<Color>(`/color/${id}`, data);
    return response.data;
  }

  static async deleteColor(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/color/${id}`);
    return response.data;
  }
} 