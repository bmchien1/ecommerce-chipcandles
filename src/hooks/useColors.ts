import { useCallback, useEffect, useState } from 'react';
import { Color, ColorService, ColorParams } from '@/lib/services/colorService';

export const useColors = (options: ColorParams = {}) => {
  const [colors, setColors] = useState<Color[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchColors = useCallback(async (params: ColorParams = options) => {
    setIsLoading(true);
    setError(null);
    try {
      const { colors, pagination } = await ColorService.getColors(params);
      setColors(colors);
      setPagination(pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch colors');
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchColors(options);
  }, [fetchColors, options]);

  // CRUD actions
  const createColor = async (data: Omit<Color, 'id'>) => {
    setIsLoading(true);
    try {
      const newColor = await ColorService.createColor(data);
      setColors(prev => [newColor, ...prev]);
      return newColor;
    } catch (err: any) {
      setError(err.message || 'Failed to create color');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateColor = async (id: number, data: Partial<Omit<Color, 'id'>>) => {
    setIsLoading(true);
    try {
      const updated = await ColorService.updateColor(id, data);
      setColors(prev => prev.map(c => (c.id === id ? updated : c)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update color');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteColor = async (id: number) => {
    setIsLoading(true);
    try {
      await ColorService.deleteColor(id);
      setColors(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete color');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    colors,
    pagination,
    isLoading,
    error,
    fetchColors,
    createColor,
    updateColor,
    deleteColor,
  };
}; 