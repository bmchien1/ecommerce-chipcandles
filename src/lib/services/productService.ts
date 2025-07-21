import { apiClient } from '../api';

export interface Product {
  id: number;
  name: string;
  description: string;
  img_url: string;
  cost: string;
  status: boolean;
}

export interface ProductParams {
  search?: string;
  page?: number;
  limit?: number;
}

export class ProductService {
  static async getProducts(params?: ProductParams): Promise<{ products: Product[]; pagination: any }> {
    const response = await apiClient.get<{ products: Product[]; pagination: any }>('/product', params);
    return { products: response.data.products, pagination: response.data.pagination };
  }

  static async getProduct(id: number): Promise<{ product: Product }> {
    const response = await apiClient.get<{ product: Product }>(`/product/${id}`);
    return response.data;
  }

  static async createProduct(data: Omit<Product, 'id'>): Promise<Product> {
    const response = await apiClient.post<Product>('/product', data);
    return response.data;
  }

  static async updateProduct(id: number, data: Partial<Omit<Product, 'id'>>): Promise<Product> {
    const response = await apiClient.put<Product>(`/product/${id}`, data);
    return response.data;
  }

  static async deleteProduct(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/product/${id}`);
    return response.data;
  }
} 