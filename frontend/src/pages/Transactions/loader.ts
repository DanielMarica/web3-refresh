import ApiClient from "../../lib/api";
import type { Transaction } from "../../types/Transaction";

// On définit ce que le composant va recevoir
export interface LoaderData {
  transactions: Transaction[];
}

// La fonction qui appelle l'API
export async function loader() {
  const transactions = await ApiClient.getTransactions();
  return { transactions };
}