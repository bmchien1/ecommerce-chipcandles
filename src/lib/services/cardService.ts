import { apiClient } from '../api';

export interface Card {
  id: number;
  name: string;
  description: string;
  material: string;
  size: string;
  design: string;
  cost: string;
  img_url: string;
  categoryId: number;
}

export interface CardParams {
  search?: string;
  page?: number;
  limit?: number;
}

export class CardService {
  static async getCards(params?: CardParams): Promise<{ cards: Card[]; pagination: any }> {
    const response = await apiClient.get<{ cards: Card[]; pagination: any }>('/card', params);
    return { cards: response.data.cards, pagination: response.data.pagination };
  }

  static async getCard(id: number): Promise<Card> {
    const response = await apiClient.get<Card>(`/card/${id}`);
    return response.data;
  }

  static async createCard(data: Omit<Card, 'id'>): Promise<Card> {
    const response = await apiClient.post<Card>('/card', data);
    return response.data;
  }

  static async updateCard(id: number, data: Partial<Omit<Card, 'id'>>): Promise<Card> {
    const response = await apiClient.put<Card>(`/card/${id}`, data);
    return response.data;
  }

  static async deleteCard(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/card/${id}`);
    return response.data;
  }
} 