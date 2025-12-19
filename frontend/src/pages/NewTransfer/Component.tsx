import { useLoaderData, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import ApiClient from '../../lib/api';
// 👇 On utilise le hook qu'on a créé dans le Layout !
import { useCurrentUser } from '../Layout';
import type { LoaderData } from './loader';

// On définit la structure de notre formulaire
type TransferFormData = {
  amount: number;
  sourceId: string; // Les selects retournent souvent des strings
  targetId: string;
};

export default function NewTransfer() {
  const { users } = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  // Configuration du formulaire
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<TransferFormData>({
    defaultValues: {
      // Si un utilisateur est sélectionné dans la navbar, on le met par défaut
      sourceId: currentUser ? String(currentUser.id) : "",
    }
  });

  const onSubmit = async (data: TransferFormData) => {
    try {
      await ApiClient.createTransfer({
        amount: Number(data.amount),
        sourceId: Number(data.sourceId),
        targetId: Number(data.targetId),
        date: new Date().toISOString(),
      });
      // Redirection vers l'historique après succès
      navigate('/transactions');
    } catch (error) {
      console.error(error);
      alert("Erreur lors du virement");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-teal-800">Nouveau Virement</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Champ Montant */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Montant (€)</label>
          <input
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            {...register("amount", { 
              required: "Le montant est requis", 
              min: { value: 0.01, message: "Minimum 0.01€" } 
            })}
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
        </div>

        {/* Champ Source (Qui donne ?) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">De (Expéditeur)</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            {...register("sourceId", { required: "Expéditeur requis" })}
          >
            <option value="">-- Choisir --</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          {errors.sourceId && <p className="text-red-500 text-sm">{errors.sourceId.message}</p>}
        </div>

        {/* Champ Target (Qui reçoit ?) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Vers (Bénéficiaire)</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            {...register("targetId", { 
              required: "Bénéficiaire requis",
              validate: (value, formValues) => value !== formValues.sourceId || "L'expéditeur et le bénéficiaire doivent être différents"
            })}
          >
            <option value="">-- Choisir --</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          {errors.targetId && <p className="text-red-500 text-sm">{errors.targetId.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Envoi en cours..." : "Valider le virement"}
        </button>

      </form>
    </div>
  );
}