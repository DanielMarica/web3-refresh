///specialiste des requête http 
///Le traducteur HTTP <-> TypeScript.

import type { Request, Response } from "express";
  import * as expenseRepository from './expenseRepository';
  import { StatusCodes } from "http-status-codes/build/cjs/status-codes";

//     // Dans Express, chaque fois que quelqu'un appelle une URL (par exemple /api/expenses), le framework crée automatiquement deux objets et les passe à ta fonction :

// req (Request / La Commande) : C'est un objet qui contient tout ce que l'utilisateur a envoyé.

// Exemple : Si l'utilisateur envoie un formulaire, les données sont dans req.body. S'il envoie un ID dans l'URL (/expenses/15), c'est dans req.params. S'il est sur mobile ou desktop, c'est dans req.headers.

// res (Response / Le Plateau du Serveur) : C'est un objet qui contient des outils pour répondre à l'utilisateur.

// Exemple : res.status(200) sert à dire "Tout va bien". res.json(...) sert à envoyer les données.
  export async function listExpenses(req: Request, res: Response) {
      const expenses = await expenseRepository.getAllExpenses();
      res.status(StatusCodes.OK).json(expenses);
  }
  // async : Ce mot-clé placé devant la fonction ne dit pas 
  // "Exécute cette fonction en parallèle des autres lignes 
  // à l'intérieur de la fonction". Il dit au serveur Express : 
  // "Attention, cette fonction va prendre du temps (elle est asynchrone),
  //  ne bloque pas tout le serveur pendant qu'elle travaille." Cela permet
  //  au serveur de gérer d'autres clients pendant que celui-ci attend.
  export async function getExpenseDetail(req: Request, res: Response) {
     // Tâche 1 : Nettoyer l'input (convertir string "15" en nombre 15)
      const id = Number(req.params.id);
      // Tâche 2 : Appeler le Repository
      const expense = await expenseRepository.getExpenseById(id);
      // Tâche 3 : Gérer la logique HTTP (Code 404)
      if (!expense) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Expense not found' });
      }
      // Tâche 4 : Répondre au client (Code 200 + JSON)
      res.status(StatusCodes.OK).json(expense);
  }

  // await await : À l'intérieur de la fonction, c'est comme un panneau STOP.

// Ligne 1 : On nettoie l'input (rapide).

// Ligne 2 (await) : On demande les données à la DB via le repository. STOP. Le code s'arrête ici. Il ne passe pas à la ligne 3 tant que la base de données n'a pas répondu.

// Ligne 3 : Une fois la donnée reçue, le code reprend.

// Pourquoi c'est vital ? Si tu n'avais pas await, ton code continuerait immédiatement à la ligne suivante.

// Tu demanderais les dépenses à la DB.

// Sans attendre la réponse, tu enverrais res.json(expenses).

// Sauf que expenses serait vide ou une "Promesse" non résolue. L'utilisateur recevrait une page blanche ou une erreur.
  export async function createExpense(req: Request, res: Response) {
      const { description, amount, date, payerId, participantIds } = req.body;

      const newExpense = await expenseRepository.createExpense({
        description,
        amount: parseFloat(amount),
        date: date ? new Date(date) : new Date(),
        payerId: Number(payerId),
        participantIds: participantIds
      });
      res.status(StatusCodes.CREATED).json(newExpense);
  }
