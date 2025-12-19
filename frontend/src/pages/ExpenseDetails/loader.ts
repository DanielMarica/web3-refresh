import ApiClient from "../../lib/api";
import type { Expense } from "../../types/Expense";
import type { LoaderFunctionArgs } from "react-router";

export interface LoaderData {
  expense: Expense;
}

// React Router nous donne 'params' qui contient l'ID de l'URL
export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.id); // On convertit "15" en nombre 15
  const expense = await ApiClient.getExpenseById(id);
  return { expense };
}