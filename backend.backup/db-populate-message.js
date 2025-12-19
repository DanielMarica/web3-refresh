const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  // Sample messages data
  const messages = [
    {
      author: 'Alice',
      content: 'Hey everyone! Just bought groceries for this week.',
    },
    {
      author: 'Bob',
      content: 'Thanks Alice! I will pay you back for my share.',
    },
    {
      author: 'Alice',
      content: 'No worries Bob! We can settle up at the end of the month.',
    },
    {
      author: 'Bob',
      content: 'I just paid for dinner at the restaurant. It was €67.80.',
    },
    {
      author: 'Alice',
      content: 'Great! I will add it to our expense tracker.',
    },
  ];

  // Create many messages at once
  const result = await prisma.message.createMany({
    data: messages,
  });

  console.log(`✅ Created ${result.count} messages`);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });