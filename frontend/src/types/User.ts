export interface User {
  id: number;
  name: string;
  email: string;
  bankAccount?: string | null; // Le ? signifie que ce champ est optionnel
}