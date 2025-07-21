import { apiClient, API_ENDPOINTS, UploadResult } from '../api';

export interface UploadParams {
  folder?: string;
}

export class UploadService {
  // Upload single image
  static async uploadSingleImage(
    file: File,
    params?: UploadParams
  ): Promise<UploadResult> {
    const response = await apiClient.uploadFile<UploadResult>(
      API_ENDPOINTS.uploadSingle,
      file,
      params
    );
    return response.data;
  }

  // Upload multiple images
  static async uploadMultipleImages(
    files: File[],
    params?: UploadParams
  ): Promise<UploadResult[]> {
    const formData = new FormData();
    
    files.forEach((file, index) => {
      formData.append('images', file);
    });
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const response = await apiClient.post<UploadResult[]>(
      API_ENDPOINTS.uploadMultiple,
      formData
    );
    return response.data;
  }

  // Upload product image
  static async uploadProductImage(file: File): Promise<UploadResult> {
    const response = await apiClient.uploadFile<UploadResult>(
      API_ENDPOINTS.uploadProduct,
      file
    );
    return response.data;
  }

  // Upload category image
  static async uploadCategoryImage(file: File): Promise<UploadResult> {
    const response = await apiClient.uploadFile<UploadResult>(
      API_ENDPOINTS.uploadCategory,
      file
    );
    return response.data;
  }

  // Delete image
  static async deleteImage(publicId: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.deleteImage(publicId));
  }

  // Validate file before upload
  static validateFile(file: File): { isValid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size must be less than 10MB'
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Only JPEG, PNG and WebP files are allowed'
      };
    }

    return { isValid: true };
  }

  // Get optimized image URL
  static getOptimizedImageUrl(
    publicId: string,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: string;
    } = {}
  ): string {
    const { width, height, quality = 'auto', format = 'auto' } = options;
    
    let transformation = '';
    if (width || height) {
      transformation += `w_${width || 'auto'},h_${height || 'auto'},c_fill/`;
    }
    transformation += `q_${quality},f_${format}`;

    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
  }
} 