import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function getAllTransfers() {
  return prisma.transfer.findMany({
    include: {
      source: true,
      target: true,
    },
  });
}

export async function createTransfer({
  amount,
  sourceId,
  targetId,
  date,
}: {
  amount: number;
  sourceId: number;
  targetId: number;
  date: Date;
}) {
  return prisma.transfer.create({
    data: {
      amount,
      date,
      source: { connect: { id: sourceId } },
      target: { connect: { id: targetId } },
    },
  });
}