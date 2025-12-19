### questions bêtes 

---

### 1. JSX vs TSX

C'est principalement une histoire de **fichier** et de **règles**.

* **JSX** (`.jsx`) : C'est du **JavaScript XML**. C'est ce qui te permet d'écrire du HTML (`<div>...</div>`) directement à l'intérieur de ton JavaScript. C'est utilisé dans les projets React "classiques" (sans TypeScript).
* **TSX** (`.tsx`) : C'est du **TypeScript XML**. C'est exactement comme du JSX, mais avec la couche de sécurité de TypeScript par-dessus.

**L'analogie 📝 :**

* **JSX**, c'est comme écrire un texte en Français libre.
* **TSX**, c'est écrire ce même texte, mais avec un professeur de grammaire qui regarde par-dessus ton épaule et souligne en rouge si tu utilises un mot qui n'existe pas (typage).

Dans ton projet, comme tu utilises TypeScript, **tous** tes composants React (qui contiennent du HTML/JSX) **doivent** avoir l'extension `.tsx`. Les fichiers qui ne contiennent que de la logique (comme `loader.ts` ou `api.ts`) restent en `.ts`.

---

### 2. C'est quoi une Promise ? (`Promise<User[]>`)

En JavaScript, certaines actions prennent du temps (aller chercher des données sur un serveur, lire un fichier). On ne peut pas bloquer tout le site pendant ce temps. C'est là qu'intervient la **Promesse**.

**L'analogie du Beeper de Restaurant 📟 :**
Imagine que tu commandes un plat (tu demandes les `Users` au serveur).

1. Le serveur ne te donne pas le plat tout de suite (ça cuit). Il te donne un **Beeper** (la **Promise**).
* *État : `Pending` (En attente).*


2. Tu retournes à ta table, tu discutes (ton code continue de s'exécuter, l'interface s'affiche).
3. Soudain, le Beeper sonne !
* **Cas A (Succès / Resolved)** : Le plat est prêt. Tu récupères tes données.
* **Cas B (Échec / Rejected)** : Le cuisinier a brûlé le plat. Tu récupères une erreur (Catch).



**Décryptons `Promise<User[]>` :**
C'est une notation TypeScript qui décrit ce "Beeper".

* `Promise<...>` : "Ceci est une boîte qui arrivera plus tard."
* `User[]` : "Quand tu ouvriras la boîte, dedans il y aura une **Liste** (`[]`) d'objets de type **User**."

Si tu avais écrit `Promise<number>`, cela voudrait dire "Je te promets que plus tard, je te donnerai un nombre".

---

### 3. Stateful vs Stateless (Avec ou Sans État)

En React, le mot **"State"** veut dire **"Mémoire"** (ou Données qui changent).

#### Composant Stateful (Avec mémoire) 🧠

C'est un composant "intelligent". Il retient des informations qui peuvent changer pendant que l'utilisateur est sur la page.

* **Indice :** Il utilise souvent `useState`, `useReducer`, ou charge des données.
* **Dans ton projet :** Ton composant **`Layout`** est *Stateful*.
* *Pourquoi ?* Il possède `const [currentUser, setCurrentUser] = useState(...)`. Il "se souvient" de qui est l'utilisateur sélectionné dans le menu déroulant. Si tu changes de page, il s'en souvient encore.



#### Composant Stateless (Sans mémoire) 🐠

C'est un composant "bête" (ou pur). Il ne fait qu'afficher ce qu'on lui donne. Il ne retient rien. Si tu lui donnes les mêmes infos (props), il affichera toujours la même chose.

* **Indice :** Il n'a pas de `useState`. C'est juste une fonction d'affichage.
* **Dans ton projet :** La page **`Welcome`** est *Stateless*.
* Elle affiche juste du texte statique. Elle ne change pas, elle ne stocke rien.
* Les petits composants comme `ExpenseItem` (que j'ai mis dans l'exemple de Transactions) sont souvent stateless : ils reçoivent une transaction via les "props" et l'affichent, point barre.



**Résumé :**

* **Stateful** = Gère de la donnée et de la logique (Le Cerveau).
* **Stateless** = Gère uniquement le visuel (Le Peintre).