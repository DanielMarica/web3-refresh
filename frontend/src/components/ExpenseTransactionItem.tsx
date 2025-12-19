import { Link } from 'react-router';
import type { Transaction } from '../types/Transaction';

export default function ExpenseTransactionItem({ transaction }: { transaction: Transaction }) {
  // On enlève le préfixe "expense-" pour avoir l'ID propre
  const expenseId = transaction.id.replace('expense-', '');
  
  return (
    <div className="p-4 border-b hover:bg-gray-50">
      <Link to={`/expenses/${expenseId}`} className="block">
        <div className="font-bold">{transaction.description}</div>
        <div>
           {transaction.payer.name} a payé {transaction.amount} €
        </div>
      </Link>
    </div>
  );
}