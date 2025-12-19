const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
  // 1. Nettoyer la DB (facultatif mais conseillé pour éviter les doublons lors des tests)
  // Attention à l'ordre : on supprime les enfants avant les parents
  await prisma.transfer.deleteMany({});
  await prisma.expense.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('🗑️  Database cleaned');

  // 2. Créer les Utilisateurs
  const alice = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@expenso.dev',
      bankAccount: 'BE12 3456 7890',
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@expenso.dev',
      bankAccount: 'FR76 5432 1098',
    },
  });

  console.log(`👤 Created Users: ${alice.name} (ID ${alice.id}) and ${bob.name} (ID ${bob.id})`);

  // 3. Créer des Dépenses (Liées à Alice et Bob)
  await prisma.expense.create({
    data: {
      description: 'Groceries',
      amount: 45.50,
      date: new Date('2024-12-10'),
      // 👇 C'est ici que ça change ! On connecte via l'ID
      payer: { connect: { id: alice.id } },
      // On dit que Bob était aussi là
      participants: { connect: [{ id: alice.id }, { id: bob.id }] }
    },
  });

  await prisma.expense.create({
    data: {
      description: 'Restaurant',
      amount: 67.80,
      date: new Date('2024-12-11'),
      payer: { connect: { id: bob.id } }, // Bob a payé
      participants: { connect: [{ id: alice.id }, { id: bob.id }] }
    },
  });

  console.log('💸 Expenses created');

  // 4. Créer des Transferts (Nouveau !)
  await prisma.transfer.create({
    data: {
      amount: 20.00,
      date: new Date(),
      // Alice envoie de l'argent à Bob
      source: { connect: { id: alice.id } },
      target: { connect: { id: bob.id } },
    }
  });

  console.log('🔄 Transfer created');
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });