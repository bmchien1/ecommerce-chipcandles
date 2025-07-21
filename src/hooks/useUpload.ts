'use client';

import { useState } from 'react';
import { UploadService, UploadParams } from '@/lib/services/uploadService';
import { UploadResult } from '@/lib/api';

export interface UseUploadOptions {
  onSuccess?: (result: UploadResult) => void;
  onError?: (error: string) => void;
}

export function useUpload(options: UseUploadOptions = {}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadSingleImage = async (file: File, params?: UploadParams): Promise<UploadResult | null> => {
    setUploading(true);
    setError(null);

    try {
      // Validate file first
      const validation = UploadService.validateFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      const result = await UploadService.uploadSingleImage(file, params);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleImages = async (files: File[], params?: UploadParams): Promise<UploadResult[] | null> => {
    setUploading(true);
    setError(null);

    try {
      // Validate all files first
      for (const file of files) {
        const validation = UploadService.validateFile(file);
        if (!validation.isValid) {
          throw new Error(validation.error);
        }
      }

      const results = await UploadService.uploadMultipleImages(files, params);
      results.forEach(result => options.onSuccess?.(result));
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadProductImage = async (file: File): Promise<UploadResult | null> => {
    setUploading(true);
    setError(null);

    try {
      const validation = UploadService.validateFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      const result = await UploadService.uploadProductImage(file);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadCategoryImage = async (file: File): Promise<UploadResult | null> => {
    setUploading(true);
    setError(null);

    try {
      const validation = UploadService.validateFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      const result = await UploadService.uploadCategoryImage(file);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (publicId: string): Promise<boolean> => {
    setUploading(true);
    setError(null);

    try {
      await UploadService.deleteImage(publicId);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return false;
    } finally {
      setUploading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    uploading,
    error,
    uploadSingleImage,
    uploadMultipleImages,
    uploadProductImage,
    uploadCategoryImage,
    deleteImage,
    clearError
  };
}

export function useImageOptimization() {
  const getOptimizedImageUrl = (
    publicId: string,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: string;
    } = {}
  ): string => {
    return UploadService.getOptimizedImageUrl(publicId, options);
  };

  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    return UploadService.validateFile(file);
  };

  return {
    getOptimizedImageUrl,
    validateFile
  };
} 