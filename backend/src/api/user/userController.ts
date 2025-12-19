import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as userRepository from './userRepository';

export async function listUsers(req: Request, res: Response) {
  // Appel au repository (await car c'est une promesse)
  const users = await userRepository.getAllUsers();
  
  // Réponse au client
  res.status(StatusCodes.OK).json(users);
}