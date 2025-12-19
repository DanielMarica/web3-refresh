import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as transferRepository from './transferRepository';

export async function listTransfers(req: Request, res: Response) {
  const transfers = await transferRepository.getAllTransfers();
  res.status(StatusCodes.OK).json(transfers);
}

export async function createTransfer(req: Request, res: Response) {
  const { amount, sourceId, targetId, date } = req.body;
  
  const newTransfer = await transferRepository.createTransfer({
    amount: parseFloat(amount),
    sourceId: Number(sourceId),
    targetId: Number(targetId),
    date: date ? new Date(date) : new Date(),
  });

  res.status(StatusCodes.CREATED).json(newTransfer);
}