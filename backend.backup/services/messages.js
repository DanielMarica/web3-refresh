const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function getAllMessages() {
    return await prisma.message.findMany({
        orderBy:{createdAt:'asc'}
    })
}

async function addMessage(message) {
  return await prisma.message.create({
    data: {
      author: message.author,
      content: message.content,
      createdAt: message.createdAt || new Date()
    }
  });
}

async function resetMessages() {
  // Delete all messages
  await prisma.message.deleteMany();
  
  // Add initial data
  const initMessages = [
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
  ];

  await prisma.message.createMany({
    data: initMessages
  });

  return await prisma.message.findMany();
}

module.exports = {
  getAllMessages,
  addMessage,
  resetMessages,
};