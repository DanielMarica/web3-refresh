import type { User } from "./User";

export interface Transaction {
  id: string;          // ex: "expense-15" ou "transfer-3"
  description: string;
  amount: number;
  date: string;        // Les dates arrivent toujours en string via JSON
  kind: 'expense' | 'transfer'; // Très important pour savoir comment l'afficher
  payer: User;         // L'objet complet (grâce au include du backend)
  participants: User[]; // Une liste d'objets (grâce au include du backend)
}