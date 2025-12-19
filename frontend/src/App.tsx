import { createBrowserRouter, RouterProvider } from "react-router";
// Layout = export "default" (sans accolades)
// { loader as layoutLoader } = export "nommé" (entre accolades) qu'on renomme avec "as" pour éviter les conflits
import Layout, { loader as layoutLoader } from "./pages/Layout";
import NewTransfer, { loader as newTransferLoader } from "./pages/NewTransfer";
// Tes pages existantes
import Welcome from "./pages/Welcome";

import Messages from "./pages/Messages";
import Transactions, {
  loader as transactionsLoader,
} from "./pages/Transactions";
import ExpenseDetails, {
  loader as expenseDetailsLoader,
} from "./pages/ExpenseDetails";
// Configuration du routeur avec la nouvelle méthode (Data APIs)
const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout, // Le cadre global (Navbar verte)
    loader: layoutLoader, // ⚡️ Charge les utilisateurs AVANT d'afficher la page
    id: "layout",
    children: [
      {
        index: true, // Correspond à la route "/"
        Component: Welcome,
      },
      {
        // 👇 2. On branche la route "transactions" (ou "expenses" si tu préfères garder ton ancien URL)
        path: "transactions",
        Component: Transactions,
        loader: transactionsLoader, // ⚡️ Charge les transactions
      },
      {
        // Le ":id" est une variable (paramètre)
        path: "expenses/:id",
        Component: ExpenseDetails,
        loader: expenseDetailsLoader,
      },
      {
        path: "messages", // Correspond à "/messages"
        Component: Messages,
      },
      {
        path: "transfers/new",
        Component: NewTransfer,
        loader: newTransferLoader,
      },
      // Plus tard, tu pourras ajouter ici :
      // { path: "transfers/new", Component: ... }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
