'use client';

import { useCallback, useEffect, useState } from 'react';
import { Product, ProductService, ProductParams } from '@/lib/services/productService';

export const useProducts = (options: ProductParams = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (params: ProductParams = options) => {
    setIsLoading(true);
    setError(null);
    try {
      const { products, pagination } = await ProductService.getProducts(params);
      setProducts(products);
      setPagination(pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchProducts(options);
  }, [fetchProducts, options]);

  // CRUD actions
  const createProduct = async (data: Omit<Product, 'id'>) => {
    setIsLoading(true);
    try {
      const newProduct = await ProductService.createProduct(data);
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id: number, data: Partial<Omit<Product, 'id'>>) => {
    setIsLoading(true);
    try {
      const updated = await ProductService.updateProduct(id, data);
      setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    setIsLoading(true);
    try {
      await ProductService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    pagination,
    isLoading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}; 