import { apiClient } from '../api';

export interface Category {
  id: number;
  name: string;
  entityType: number;
}

export interface CategoryParams {
  entityType?: number;
  page?: number;
  limit?: number;
}

export class CategoryService {
  static async getCategories(params?: CategoryParams): Promise<{ categories: Category[]; pagination: any }> {
    const response = await apiClient.get('/category', params);
    const data = response.data as any;
    if (data.categories && data.pagination) {
      return { categories: data.categories, pagination: data.pagination };
    }
    if (Array.isArray(data)) {
      return { categories: data, pagination: null };
    }
    if (Array.isArray(data.categories)) {
      return { categories: data.categories, pagination: null };
    }
    return { categories: [], pagination: null };
  }

  static async getCategory(id: number): Promise<Category> {
    const response = await apiClient.get<Category>(`/category/${id}`);
    return response.data;
  }

  static async createCategory(data: Omit<Category, 'id'>): Promise<Category> {
    const response = await apiClient.post<Category>('/category', data);
    return response.data;
  }

  static async updateCategory(id: number, data: Partial<Omit<Category, 'id'>>): Promise<Category> {
    const response = await apiClient.put<Category>(`/category/${id}`, data);
    return response.data;
  }

  static async deleteCategory(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/category/${id}`);
    return response.data;
  }
} 