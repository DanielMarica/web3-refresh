Pour faire court : any est plus "facile" (ça marche tout de suite), mais unknown est plus "sûr" (ça protège ton code).

Si tu as dû utiliser any pour que ça marche, c'est probablement parce que TypeScript t'embêtait avec des erreurs de compatibilité. Voici pourquoi.

1. any : Le "Je m'en fiche" 🙈

Quand tu utilises any, tu dis au compilateur TypeScript : "Ferme les yeux. Fais-moi confiance. Je fais ce que je veux avec cette variable."

Avantage : Plus aucune erreur rouge. Tu peux passer ton objet à n'importe quelle fonction.

Inconvénient : Tu perds toute la sécurité. Si tu te trompes (ex: tu envoies un string au lieu d'un objet), TypeScript ne te préviendra pas et ton app plantera à l'exécution.

TypeScript
const createTransfer = (payload: any) => {
  console.log(payload.bizarretruc); // TypeScript dit OK (alors que ça n'existe pas !)
  sendApiRequest("POST", "transfers", payload); // TypeScript dit OK
}
2. unknown : Le "Je ne sais pas (encore)" 🔒

Quand tu utilises unknown, tu dis : "Je reçois quelque chose, mais je ne sais pas ce que c'est. Donc par sécurité, je t'interdis d'y toucher tant que je n'ai pas vérifié."

Avantage : C'est très sécurisé.

Inconvénient : C'est restrictif. Si tu essaies de passer cette variable à une fonction qui attend quelque chose de précis (comme sendApiRequest qui attend peut-être un object et pas unknown), TypeScript va bloquer.

TypeScript
const createTransfer = (payload: unknown) => {
   // console.log(payload.amount); // 💥 ERREUR ! TypeScript bloque car il ne sait pas si 'amount' existe.
   sendApiRequest("POST", "transfers", payload); 
   // Cela peut planter si sendApiRequest attend un type précis et pas unknown.
}