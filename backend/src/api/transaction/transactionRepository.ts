import { PrismaClient } from "../../../generated/prisma";
import { fromExpense, fromTransfer } from "./transactionModel";

const prisma = new PrismaClient();

export async function getAllTransactions() {
  // 1. On lance les deux recherches en parallèle
  const expensesPromise = prisma.expense.findMany({
    //necaisare d'utiliser include pour aller chercher toute les infos car sinon il ne renvoie que l'id 
    include: { payer: true, participants: true },
  });
  const transfersPromise = prisma.transfer.findMany({
    include: { source: true, target: true },
  });

  // 2. On attend que les deux soient finies
  const [expenses, transfers] = await Promise.all([
    expensesPromise,
    transfersPromise,
  ]);

  // 3. On convertit tout le monde en "Transaction"
  const normalizedExpenses = expenses.map(fromExpense);
  const normalizedTransfers = transfers.map(fromTransfer);

  // 4. On fusionne et on trie par date (du plus récent au plus vieux)
  const allTransactions = [...normalizedExpenses, ...normalizedTransfers];
  return allTransactions.sort((a, b) => b.date.getTime() - a.date.getTime());
}