'use client';

import { useCallback, useEffect, useState } from 'react';
import { Category, CategoryService, CategoryParams } from '@/lib/services/categoryService';

export const useCategories = (options: CategoryParams = {}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async (params: CategoryParams = options) => {
    setIsLoading(true);
    setError(null);
    try {
      const { categories, pagination } = await CategoryService.getCategories(params);
      setCategories(categories);
      setPagination(pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchCategories(options);
  }, [fetchCategories, options]);

  // CRUD actions
  const createCategory = async (data: Omit<Category, 'id'>) => {
    setIsLoading(true);
    try {
      const newCategory = await CategoryService.createCategory(data);
      setCategories(prev => [newCategory, ...prev]);
      return newCategory;
    } catch (err: any) {
      setError(err.message || 'Failed to create category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = async (id: number, data: Partial<Omit<Category, 'id'>>) => {
    setIsLoading(true);
    try {
      const updated = await CategoryService.updateCategory(id, data);
      setCategories(prev => prev.map(c => (c.id === id ? updated : c)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id: number) => {
    setIsLoading(true);
    try {
      await CategoryService.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    categories,
    pagination,
    isLoading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

export function useCategory(id: number) {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await CategoryService.getCategory(id);
        setCategory(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch category');
        setCategory(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchCategory();
  }, [id]);

  return { category, isLoading, error };
} 