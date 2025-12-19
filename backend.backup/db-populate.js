const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  // Sample expenses data
  const expenses = [
    {
      description: 'Groceries',
      payer: 'Alice',
      amount: 45.50,
      date: new Date('2024-12-10'),
    },
    {
      description: 'Restaurant',
      payer: 'Bob',
      amount: 67.80,
      date: new Date('2024-12-11'),
    },
    {
      description: 'Movie tickets',
      payer: 'Alice',
      amount: 28.00,
      date: new Date('2024-12-12'),
    },
  ];

  // Create many expenses at once
  const result = await prisma.expense.createMany({
    data: expenses,
  });

  console.log(`✅ Created ${result.count} expenses`);
}

main()
// .finally() = "Always do this, no matter what happens" always runs when main finish
// await = "Wait for this to finish before continuing"
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });