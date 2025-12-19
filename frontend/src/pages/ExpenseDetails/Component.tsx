import { useLoaderData, Link } from 'react-router';
import type { LoaderData } from './loader';

export default function ExpenseDetails() {
  const { expense } = useLoaderData<LoaderData>();

  // Calcul de la part de chacun (Montant total / Nombre de participants)
  const share = expense.amount / expense.participants.length;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-lg mt-6">
      <Link to="/transactions" className="text-teal-600 hover:underline mb-4 block">
        ← Retour à la liste
      </Link>
      
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{expense.description}</h1>
        <div className="text-3xl font-bold text-teal-700 mt-2">{expense.amount} €</div>
        <div className="text-gray-500 text-sm mt-1">
          le {new Date(expense.date).toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Info Payeur */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-bold text-gray-500 uppercase text-xs mb-2">Payé par</h3>
          <p className="text-lg font-semibold">{expense.payer.name}</p>
          <p className="text-sm text-gray-500">{expense.payer.email}</p>
        </div>

        {/* Info Part individuelle */}
        <div className="bg-blue-50 p-4 rounded text-center">
          <h3 className="font-bold text-blue-500 uppercase text-xs mb-2">Coût par personne</h3>
          <p className="text-2xl font-bold text-blue-700">
            {share.toFixed(2)} €
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-800 mb-2">Participants ({expense.participants.length})</h3>
        <ul className="space-y-2">
            {expense.participants.map(p => (
                <li key={p.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded border border-gray-100">
                    <span>{p.name}</span>
                    {/* On montre ce qu'ils doivent (sauf si c'est le payeur) */}
                    {p.id !== expense.payer.id && (
                        <span className="text-red-500 text-sm font-bold">Doit {share.toFixed(2)} €</span>
                    )}
                    {p.id === expense.payer.id && (
                        <span className="text-green-600 text-sm font-bold bg-green-100 px-2 py-0.5 rounded">A payé</span>
                    )}
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
}