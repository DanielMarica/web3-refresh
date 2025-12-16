import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Expense } from '../../types/Expense';
import { expenseSchema, type ExpenseFormData } from '../schema/expenseSchema';
import './ExpenseAdd.css';

interface ExpenseAddProps {
  addExpense: (expense: Expense) => void;
}

export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema), // 🎯 Zod validation!
  });

  const onSubmit = (data: ExpenseFormData) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      description: data.description,
      payer: data.payer,
      amount: parseFloat(data.amount),
      date: data.date || new Date().toISOString(),
    };

    addExpense(newExpense);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Add New Expense</h3>

      <div>
        <label>
          Description:
          <input
            type="text"
            {...register('description')}
            placeholder="Enter description"
          />
          {errors.description && (
            <span className="error">{errors.description.message}</span>
          )}
        </label>
      </div>

      <div>
        <label>
          Payer:
          <select {...register('payer')}>
            <option value="">-- Select payer --</option>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
          {errors.payer && (
            <span className="error">{errors.payer.message}</span>
          )}
        </label>
      </div>

      <div>
        <label>
          Amount:
          <input
            type="number"
            step="0.01"
            {...register('amount')}
            placeholder="Enter amount"
          />
          {errors.amount && (
            <span className="error">{errors.amount.message}</span>
          )}
        </label>
      </div>

      <div>
        <label>
          Date:
          <input type="date" {...register('date')} />
          {errors.date && (
            <span className="error">{errors.date.message}</span>
          )}
        </label>
      </div>

      <button type="submit">Add Expense</button>
    </form>
  );
}