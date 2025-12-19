import type { Transaction } from '../types/Transaction';

export default function TransferTransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <div className="p-4 border-b bg-yellow-50">
      <div className="font-bold text-teal-700">Virement</div>
      <div>
        {transaction.payer.name} a viré {transaction.amount} € à {transaction.participants[0].name}
      </div>
    </div>
  );
}