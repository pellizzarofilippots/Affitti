import { LeaseContract } from './contract';

export interface Payment {
  id?: number;
  contract?: Partial<LeaseContract>;
  amount: number;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
}
