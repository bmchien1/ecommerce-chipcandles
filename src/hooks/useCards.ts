import { useCallback, useEffect, useState } from 'react';
import { Card, CardService, CardParams } from '@/lib/services/cardService';

export const useCards = (options: CardParams = {}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async (params: CardParams = options) => {
    setIsLoading(true);
    setError(null);
    try {
      const { cards, pagination } = await CardService.getCards(params);
      setCards(cards);
      setPagination(pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch cards');
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchCards(options);
  }, [fetchCards, options]);

  // CRUD actions
  const createCard = async (data: Omit<Card, 'id'>) => {
    setIsLoading(true);
    try {
      const newCard = await CardService.createCard(data);
      setCards(prev => [newCard, ...prev]);
      return newCard;
    } catch (err: any) {
      setError(err.message || 'Failed to create card');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCard = async (id: number, data: Partial<Omit<Card, 'id'>>) => {
    setIsLoading(true);
    try {
      const updated = await CardService.updateCard(id, data);
      setCards(prev => prev.map(c => (c.id === id ? updated : c)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update card');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCard = async (id: number) => {
    setIsLoading(true);
    try {
      await CardService.deleteCard(id);
      setCards(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete card');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cards,
    pagination,
    isLoading,
    error,
    fetchCards,
    createCard,
    updateCard,
    deleteCard,
  };
}; 