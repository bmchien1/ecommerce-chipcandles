import { useCallback, useEffect, useState } from 'react';
import { Box, BoxService, BoxParams } from '@/lib/services/boxService';

export const useBoxes = (options: BoxParams = {}) => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBoxes = useCallback(async (params: BoxParams = options) => {
    setIsLoading(true);
    setError(null);
    try {
      const { boxes, pagination } = await BoxService.getBoxes(params);
      setBoxes(boxes);
      setPagination(pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch boxes');
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchBoxes(options);
  }, [fetchBoxes, options]);

  // CRUD actions
  const createBox = async (data: Omit<Box, 'id'>) => {
    setIsLoading(true);
    try {
      const newBox = await BoxService.createBox(data);
      setBoxes(prev => [newBox, ...prev]);
      return newBox;
    } catch (err: any) {
      setError(err.message || 'Failed to create box');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBox = async (id: number, data: Partial<Omit<Box, 'id'>>) => {
    setIsLoading(true);
    try {
      const updated = await BoxService.updateBox(id, data);
      setBoxes(prev => prev.map(b => (b.id === id ? updated : b)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update box');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBox = async (id: number) => {
    setIsLoading(true);
    try {
      await BoxService.deleteBox(id);
      setBoxes(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete box');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    boxes,
    pagination,
    isLoading,
    error,
    fetchBoxes,
    createBox,
    updateBox,
    deleteBox,
  };
}; 