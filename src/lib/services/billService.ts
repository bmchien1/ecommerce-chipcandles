import { apiClient } from '../api';

export interface Bill {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes?: string;
  orderItems: any[];
  paymentMethod: string;
  isPaid: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export class BillService {
  static async getBills(): Promise<Bill[]> {
    const response = await apiClient.get<Bill[]>('/bill');
    return response.data;
  }

  static async getBill(id: number): Promise<Bill> {
    const response = await apiClient.get<Bill>(`/bill/${id}`);
    return response.data;
  }

  static async createBill(data: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bill> {
    const response = await apiClient.post<Bill>('/bill', data);
    return response.data;
  }

  static async updateBill(id: number, data: Partial<Omit<Bill, 'id'>>): Promise<Bill> {
    const response = await apiClient.put<Bill>(`/bill/${id}`, data);
    return response.data;
  }

  static async deleteBill(id: number): Promise<{ success: boolean }> {
    const response = await apiClient.delete<{ success: boolean }>(`/bill/${id}`);
    return response.data;
  }
} 