import { useCallback, useEffect, useState } from 'react';
import { Scent, ScentService, ScentParams } from '@/lib/services/scentService';

export const useScents = (options: ScentParams = {}) => {
  const [scents, setScents] = useState<Scent[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScents = useCallback(async (params: ScentParams = options) => {
    setIsLoading(true);
    setError(null);
    try {
      const { scents, pagination } = await ScentService.getScents(params);
      setScents(scents);
      setPagination(pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch scents');
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchScents(options);
  }, [fetchScents, options]);

  // CRUD actions
  const createScent = async (data: Omit<Scent, 'id'>) => {
    setIsLoading(true);
    try {
      const newScent = await ScentService.createScent(data);
      setScents(prev => [newScent, ...prev]);
      return newScent;
    } catch (err: any) {
      setError(err.message || 'Failed to create scent');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateScent = async (id: number, data: Partial<Omit<Scent, 'id'>>) => {
    setIsLoading(true);
    try {
      const updated = await ScentService.updateScent(id, data);
      setScents(prev => prev.map(s => (s.id === id ? updated : s)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update scent');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteScent = async (id: number) => {
    setIsLoading(true);
    try {
      await ScentService.deleteScent(id);
      setScents(prev => prev.filter(s => s.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete scent');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    scents,
    pagination,
    isLoading,
    error,
    fetchScents,
    createScent,
    updateScent,
    deleteScent,
  };
}; 