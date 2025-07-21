// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Product Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock_quantity: number;
  featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Category Types
export interface Category {
  name: string;
  value: string;
  productCount: number;
}

export interface CategoryDetails extends Category {
  averagePrice: number;
  sampleProducts: Product[];
}

// Review Types
export interface Review {
  id: number;
  product_id: number;
  product_name?: string;
  customer_name: string;
  customer_email: string;
  rating: number;
  comment: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReviewStats {
  ratingStats: Record<number, number>;
  totalReviews: number;
}

// Upload Types
export interface UploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
}

// API Client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    console.log('[ApiClient][request] URL:', url, '| Method:', options.method || 'GET', '| Body:', options.body);
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      console.log('[ApiClient][response] URL:', url, '| Status:', response.status, '| Data:', data);

      if (!response.ok) {
        console.error('[ApiClient][error] URL:', url, '| Status:', response.status, '| Data:', data);
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let fullEndpoint = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      fullEndpoint += `?${searchParams.toString()}`;
    }
    console.log('[ApiClient][get] endpoint:', endpoint, '| params:', params, '| fullEndpoint:', fullEndpoint);
    return this.request<T>(fullEndpoint);
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    console.log('[ApiClient][post] endpoint:', endpoint, '| data:', data);
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    console.log('[ApiClient][put] endpoint:', endpoint, '| data:', data);
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    console.log('[ApiClient][delete] endpoint:', endpoint);
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // Upload file
  async uploadFile<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('image', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }
}

// Create API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// API Endpoints