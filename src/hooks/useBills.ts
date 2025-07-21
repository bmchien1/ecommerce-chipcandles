import { useCallback, useEffect, useState } from 'react';
import { Bill, BillService } from '@/lib/services/billService';

export const useBills = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBills = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await BillService.getBills();
      setBills(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bills');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  // CRUD actions
  const createBill = async (data: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const newBill = await BillService.createBill(data);
      setBills(prev => [newBill, ...prev]);
      return newBill;
    } catch (err: any) {
      setError(err.message || 'Failed to create bill');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBill = async (id: number, data: Partial<Omit<Bill, 'id'>>) => {
    setIsLoading(true);
    try {
      const updated = await BillService.updateBill(id, data);
      setBills(prev => prev.map(b => (b.id === id ? updated : b)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update bill');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBill = async (id: number) => {
    setIsLoading(true);
    try {
      await BillService.deleteBill(id);
      setBills(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete bill');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bills,
    isLoading,
    error,
    fetchBills,
    createBill,
    updateBill,
    deleteBill,
  };
}; 