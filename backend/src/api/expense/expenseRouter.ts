import { Router } from 'express';
import * as expenseController from './expenseController';
///Router : L'aiguilleur ("Toi, va là-bas").
const expenseRouter = Router();

// Quand on fait GET /api/expenses/
expenseRouter.get('/', expenseController.listExpenses);

// Quand on fait GET /api/expenses/123
expenseRouter.get('/:id', expenseController.getExpenseDetail);

// Quand on fait POST /api/expenses/
expenseRouter.post('/', expenseController.createExpense);

export default expenseRouter;