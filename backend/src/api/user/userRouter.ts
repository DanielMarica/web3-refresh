import { Router } from 'express';
import * as userController from './userController';

const userRouter = Router();

userRouter.get('/', userController.listUsers);

export default userRouter;