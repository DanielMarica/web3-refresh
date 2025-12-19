import type { User } from "./User";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  payerId: number;
  payer: User;
  participants: User[];
}