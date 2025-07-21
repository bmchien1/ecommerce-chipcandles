import { useCallback, useEffect, useState } from 'react';
import { Mold, MoldService, MoldParams } from '@/lib/services/moldService';

export const useMolds = (options: MoldParams = {}) => {
  const [molds, setMolds] = useState<Mold[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMolds = useCallback(async (params: MoldParams = options) => {
    setIsLoading(true);
    setError(null);
    try {
      const { molds, pagination } = await MoldService.getMolds(params);
      setMolds(molds);
      setPagination(pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch molds');
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchMolds(options);
  }, [fetchMolds, options]);

  // CRUD actions
  const createMold = async (data: Omit<Mold, 'id'>) => {
    setIsLoading(true);
    try {
      const newMold = await MoldService.createMold(data);
      setMolds(prev => [newMold, ...prev]);
      return newMold;
    } catch (err: any) {
      setError(err.message || 'Failed to create mold');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMold = async (id: number, data: Partial<Omit<Mold, 'id'>>) => {
    setIsLoading(true);
    try {
      const updated = await MoldService.updateMold(id, data);
      setMolds(prev => prev.map(m => (m.id === id ? updated : m)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update mold');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMold = async (id: number) => {
    setIsLoading(true);
    try {
      await MoldService.deleteMold(id);
      setMolds(prev => prev.filter(m => m.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete mold');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    molds,
    pagination,
    isLoading,
    error,
    fetchMolds,
    createMold,
    updateMold,
    deleteMold,
  };
}; 