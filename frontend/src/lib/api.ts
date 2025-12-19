import type { NewTransferPayload } from "../../src/types/Transfer";
import type { Transaction } from "../../src/types/Transaction";
import type { User } from "../../src/types/User";
import type { Expense } from "../../src/types/Expense";
// Si tu as besoin du type Expense plus tard, on l'ajoutera ici

// On récupère l'URL de l'API. Par défaut c'est localhost:3000
const API_HOST = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Une fonction générique pour ne pas répéter les headers et les erreurs partout
const sendApiRequest = async (
  method: string = "GET",
  path: string,
  body?: unknown
) => {
  try {
    const response = await fetch(`${API_HOST}/api/${path}`, {
      method: method,
      headers: body ? { "Content-Type": "application/json" } : {},
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // On transforme la réponse en JSON
    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error; // On renvoie l'erreur pour que le Frontend puisse l'afficher
  }
};

// --- Les fonctions spécifiques ---

// 1. Récupérer tous les utilisateurs
const getUsers = () => sendApiRequest("GET", "users") as Promise<User[]>;

// 2. Récupérer l'historique complet (Transactions)
const getTransactions = () => sendApiRequest("GET", "transactions") as Promise<Transaction[]>;

const getExpenseById = (id: number) => 
  sendApiRequest("GET", `expenses/${id}`) as Promise<Expense>;

const createTransfer = (payload: NewTransferPayload) => 
  sendApiRequest("POST", "transfers", payload);
// On exporte tout dans un objet "ApiClient" facile à utiliser

export const ApiClient = {
  getUsers,
  getTransactions,
  getExpenseById,
  createTransfer
};

export default ApiClient;