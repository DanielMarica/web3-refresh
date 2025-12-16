import { z } from 'zod';

export const expenseSchema = z.object({
  description: z
    .string()
    .min(1, 'Description is required')
    .max(200, 'Description must be less than 200 characters'),
  
  payer: z
    .enum(['Alice', 'Bob'] as const, {
      error: 'Payer must be either Alice or Bob',
    }),
  
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      { message: 'Amount must be a positive number' }
    ),
  
  date: z.string().optional(),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;