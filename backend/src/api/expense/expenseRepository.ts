/// ce fichier parle driectement à la db 
/// specialiste de la db 
import { PrismaClient } from '../../../generated/prisma';
const prisma = new PrismaClient();

export async function getAllExpenses() {
  // On récupère les dépenses ET on inclut les infos du payeur et des participants
  return prisma.expense.findMany({
    include: {
      payer: true,
      participants: true,
    },
  });
}

export async function getExpenseById(id: number) {
  return prisma.expense.findUnique({
    where: { id },
    include: {
      payer: true,
      participants: true,
    },
  });
}

/**
 * Crée une nouvelle dépense dans la base de données et lie le payeur et les participants.
 * * @param params - L'objet contenant les détails de la dépense.
 * @param params.description - Le titre ou la description de la dépense (ex: "Restaurant").
 * @param params.amount - Le montant total de la dépense.
 * @param params.date - La date de la dépense.
 * @param params.payerId - L'ID de l'utilisateur qui a payé (doit exister en BDD).
 * @param params.participantIds - Un tableau d'IDs des utilisateurs qui participent (doivent exister en BDD).
 * @returns La dépense créée avec ses relations (via Prisma).
 */

export async function createExpense({
  description,
  amount,
  date,
  payerId,
  participantIds,
}: {
  description: string;
  amount: number;
  date: Date;
  payerId: number;
  participantIds: number[];
}) {
  return prisma.expense.create({
    data: {
      description,
      amount,
      date,
      // Liaison avec le payeur (One-to-Many)
      payer: { connect: { id: payerId } },
      // Liaison avec les participants (Many-to-Many)
      participants: { 
        connect: participantIds.map((id) => ({ id })) 
      },
    },
  });
}

// Propriété,C'est quoi ?,À quoi ça sert ?,Exemple concret,Ce que tu reçois (JSON)
// req.body,Le corps du message (caché).,"Envoyer des données pour créer ou modifier (formulaires, objets complexes).","Envoi JSON via POST :{ ""amount"": 50 }",{ amount: 50 }
// req.params,Les paramètres de route (dans l'URL).,Identifier une ressource précise (ID unique) de manière obligatoire.,Route : /expenses/:idURL : /expenses/42,"{ id: ""42"" }"
// req.query,La query string (après le ?).,"Filtrer, trier, chercher ou paginer (souvent optionnel).",URL :/expenses?tri=date,"{ tri: ""date"" }"
// req.headers,Les en-têtes techniques.,"Transmettre des méta-données (Authentification, type de contenu, langue).",Header Authorization :Bearer mon_token_abc,"{ authorization: ""Bearer..."" }"