import { Router } from 'express';
import * as transferController from './transferController';

const transferRouter = Router();

transferRouter.get('/', transferController.listTransfers);
transferRouter.post('/', transferController.createTransfer);

export default transferRouter;