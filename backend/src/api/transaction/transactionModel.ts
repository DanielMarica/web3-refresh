import { Prisma } from '../../../generated/prisma'; // Attention au chemin vers prisma
import { z } from 'zod';

// On récupère les types exacts générés par Prisma (avec les relations incluses)
// Prisma.ExpenseGetPayload<...> sert à dire à TypeScript :

// "Attention, ici ce n'est pas juste le Burger seul. 
// C'est le Burger AVEC les frites (payer) et la boisson (participants) 
// que j'ai définis dans le include."
type ExpenseWithRelations = Prisma.ExpenseGetPayload<{
  include: { payer: true; participants: true };
}>;

type TransferWithRelations = Prisma.TransferGetPayload<{
  include: { source: true; target: true };
}>;

// On définit notre schéma de sortie
export const TransactionSchema = z.object({
  id: z.string(),
  description: z.string(),
  amount: z.number(),
  date: z.date(),
  kind: z.enum(['expense', 'transfer']), // Pour savoir de quoi il s'agit
  payer: z.any(),        // On simplifie ici pour l'exercice
  participants: z.array(z.any()),
});

// Le type TypeScript déduit
export type Transaction = z.infer<typeof TransactionSchema>; // typeof == single source of truth

// Convertisseur : Expense -> Transaction
export const fromExpense = (expense: ExpenseWithRelations): Transaction => {
  return {
    id: `expense-${expense.id}`, // On génère un ID unique (ex: expense-15)
    description: expense.description,
    amount: expense.amount,
    date: expense.date,
    kind: 'expense',
    payer: expense.payer,
    participants: expense.participants,
  };
};

// Convertisseur : Transfer -> Transaction
export const fromTransfer = (transfer: TransferWithRelations): Transaction => {
  return {
    id: `transfer-${transfer.id}`, // (ex: transfer-3)
    description: 'Transfer',
    amount: transfer.amount,
    date: transfer.date,
    kind: 'transfer',
    payer: transfer.source,        // L'expéditeur devient le "payeur"
    participants: [transfer.target], // Le destinataire devient le "participant" // on mets les crochet pour cérer un tableau 
  };
};