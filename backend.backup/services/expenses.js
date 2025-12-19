const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function getAllExpenses() {
  return await prisma.expense.findMany({
    orderBy: { date: 'desc' } // Sort by date, newest first
  });
}

async function addExpense(expense) {
  return await prisma.expense.create({
    data: {
      description: expense.description,
      payer: expense.payer,
      amount: expense.amount,
      date: expense.date ? new Date(expense.date) : new Date()
    }
  });
}

async function resetExpenses() {
  // Delete all expenses
  await prisma.expense.deleteMany();
  
  // Add initial data
  const initExpenses = [
    {
      description: "Example expense #1 from Alice",
      payer: "Alice",
      amount: 25.5,
      date: new Date("2025-01-16")
    },
    {
      description: "Example expense #2 from Bob",
      payer: "Bob",
      amount: 35,
      date: new Date("2025-01-15")
    },
    {
      description: "Example expense #3 from Alice",
      payer: "Alice",
      amount: 2,
      date: new Date("2025-01-15")
    }
  ];

  await prisma.expense.createMany({
    data: initExpenses
  });

  return await prisma.expense.findMany();
}

module.exports = {
  getAllExpenses,
  addExpense,
  resetExpenses,
};