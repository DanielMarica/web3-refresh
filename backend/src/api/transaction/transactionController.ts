import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as transactionRepository from './transactionRepository';

export async function listTransactions(req: Request, res: Response) {
  const transactions = await transactionRepository.getAllTransactions();
  res.status(StatusCodes.OK).json(transactions);
}