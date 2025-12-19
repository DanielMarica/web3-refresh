import { NavLink, Outlet, useLoaderData } from 'react-router';
import { useState } from 'react';
import type { User } from '../../types/User';
import type { LoaderData } from './loader';

export default function Layout() {
  // 1. On récupère les données chargées par le loader
  const { users } = useLoaderData<LoaderData>();
  
  // 2. State pour savoir qui est sélectionné (par défaut personne: null)
  const [currentUser, setCurrentUser] = useState<null | User>(null);

  // 3. Fonction quand on change le select
  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    const selected = users.find(u => u.id === id) ?? null;
    setCurrentUser(selected);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* --- NAVBAR --- */}
      <nav className="bg-teal-800 text-white p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          
          <div className="text-xl font-bold tracking-tight">
            💸 Expenso
          </div>

          <div className="flex items-center gap-6">
            {/* Liens de navigation */}
            <NavLink 
              to="/transactions" 
              className={({ isActive }) => 
                isActive ? "text-white font-bold border-b-2 border-white" : "text-teal-200 hover:text-white transition"
              }
            >
              Historique
            </NavLink>
            
            <NavLink 
              to="/transfers/new" 
              className={({ isActive }) => 
                isActive ? "text-white font-bold border-b-2 border-white" : "text-teal-200 hover:text-white transition"
              }
            >
              Nouveau Virement
            </NavLink>

            {/* Sélecteur d'utilisateur */}
            <div className="flex items-center gap-2 bg-teal-900/50 p-1 rounded">
              <span className="text-xs text-teal-300 uppercase font-semibold pl-2">User:</span>
              <select
                value={currentUser?.id ?? 'none'}
                onChange={handleUserChange}
                className="bg-white text-gray-900 text-sm rounded px-2 py-1 outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="none">-- Personne --</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* --- CONTENU DE LA PAGE --- */}
      <main className="max-w-4xl mx-auto p-6">
        {/* On passe le currentUser aux pages enfants via le contexte */}
        <Outlet context={{ currentUser }} />
      </main>
    </div>
  );
}